from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from django.contrib.auth import get_user_model
# Create your models here.

def upload_goal_img_path_handler(instance, filename):
    filetype = filename.split(".")[-1]
    return f"goal/{instance.user.username}.{filetype}"

def upload_bill_img_path_handler(instance, filename):
    filetype = filename.split(".")[-1]
    return f"bill/{instance.user.username}.{filetype}"

def upload_img_ocr_path_handler(instance, filename):
    filetype = filename.split(".")[-1]
    return f"ocr/{instance.pk}.{filetype}"

User = get_user_model()

class BankAccount(models.Model):
    statuschoices = (
        ('ACT', 'Active'),
        ('PAU', 'Paused'),
        ('DEL', 'Deleted')
    )
    account_type_choices = (
        ('SAV', 'Savings'),
        ('CUR', 'Current')
    )
    user              = models.ForeignKey(User, on_delete=models.CASCADE)
    account_type      = models.CharField(max_length=4, choices=account_type_choices)
    status            = models.CharField(max_length=4, choices=statuschoices, default='ACT')
    branch            = models.CharField(max_length=255)
    facility          = models.CharField(max_length=255, blank=True, null=True)
    currency          = models.CharField(max_length=3, default='INR')
    exchange_rate     = models.DecimalField(max_digits=10, decimal_places=2, default=1.00)
    balance           = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ifsc              = models.CharField(max_length=11, unique=True)
    od_limit          = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    opening_date      = models.DateField(blank=True, null=True)
    drawing_limit     = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    micr_code         = models.CharField(max_length=9)
    masked_account_no = models.CharField(max_length=255)

    def __str__(self):
        return self.user.firstname + ' - ' + self.masked_account_no

class Budget(models.Model):

    recurrence_choices = (
        ('W', 'Weekly'),
        ('M', 'Monthly'),
        ('Q', 'Quarterly'),
        ('Y', 'Yearly'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.ForeignKey(BankAccount, on_delete=models.CASCADE)
    category = models.CharField(max_length=255, default='Others')
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    goal_img = models.ImageField(blank=True, null=True, upload_to=upload_goal_img_path_handler)
    recurrence = models.CharField(max_length=255, choices=recurrence_choices, blank=True, null=True)

    def __str__(self):
        return self.name
    
@receiver(pre_save, sender=Budget)
def check_account_details(sender, instance, **kwargs):
    try:
        user = User.objects.get(id=instance.user.id)
        account = BankAccount.objects.get(id=instance.account.id, user=user)
    except User.DoesNotExist as ue:
        raise Exception('User does not exist')
    except BankAccount.DoesNotExist as be:
        raise Exception('Bank Account does not belong to this user')
    
class Transaction(models.Model):
    transaction_mode_choices = (
        ('UPI', 'UPI'),
        ('NEF', 'NEFT'),
        ('RTG', 'RTGS'),
        ('CRE', 'Credit Card'),
        ('DEB', 'Debit Card')
    )
    transaction_type_choices = (
        ('DEB', 'Debit'),
        ('CRE', 'Credit')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.ForeignKey(BankAccount, on_delete=models.CASCADE)
    category = models.CharField(max_length=255)
    transaction_type = models.CharField(max_length=3, choices=transaction_type_choices)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    narration = models.TextField(blank=True, null=True)
    initial_balance = models.DecimalField(max_digits=10, decimal_places=2)
    mode = models.CharField(max_length=3, choices=transaction_mode_choices, default='UPI')
    bill_img = models.ImageField(blank=True, null=True, upload_to=upload_bill_img_path_handler)

    def __str__(self):
        return self.user.firstname + ' - ' + self.account.ifsc + ' - ' + self.transaction_type + ' - '  + str(self.amount)
    
    @property
    def final_balance(self):
        if(self.transaction_type == 'DEB'):
            return self.initial_balance - self.amount
        else:
            return self.initial_balance + self.amount

@receiver(pre_save, sender=Transaction)
def check_account_details(sender, instance, **kwargs):
    try:
        user = User.objects.get(id=instance.user.id)
        account = BankAccount.objects.get(id=instance.account.id, user=user)
    except User.DoesNotExist as ue:
        raise Exception('User does not exist')
    except BankAccount.DoesNotExist as be:
        raise Exception('Bank Account does not belong to this user')
    
@receiver(post_save, sender=Transaction)
def update_balance(sender, instance, **kwargs):
    try:
        user = User.objects.get(id=instance.user.id)
        user.points = user.points + 5
        user.save()
        account = BankAccount.objects.get(id=instance.account.id, user=user)
        if(instance.transaction_type == 'DEB'):
            if(account.balance < instance.amount):
                if(account.balance - instance.amount + account.od_limit > 0):
                    account.balance = account.balance - instance.amount
                else:
                    raise Exception("Insufficient Balance")
            else:
                account.balance = account.balance - instance.amount
            try:
                budget = Budget.objects.get(user=user, account=account, category=instance.category)
                budget.limit = budget.limit - instance.amount
                budget.save()
            except Budget.DoesNotExist as e:
                pass
        else:
            account.balance = account.balance + instance.amount
            try:
                budget = Budget.objects.get(user=user, account=account, category=instance.category)
                budget.limit = budget.limit + instance.amount
                budget.save()
            except Budget.DoesNotExist as e:
                pass
        account.save()
    except User.DoesNotExist as ue:
        raise Exception("User does not exist")
    except BankAccount.DoesNotExist as bae:
        raise Exception("Account does not exist")
    
class OCR(models.Model):
    image = models.ImageField(upload_to=upload_img_ocr_path_handler)

class Coupons(models.Model):
    name = models.CharField(max_length=255, default='Coupon')
    category = models.CharField(max_length=255, choices=(('Food', 'Food'), ('Shopping', 'Shopping'), ('Transport', 'Transport')))
    coupon_code = models.CharField(max_length=255, unique=True)
    discount = models.IntegerField(default=10)
    expiry_date = models.DateField()
    value_points = models.IntegerField(default=100)

    def __str__(self):
        return self.coupon_code
    