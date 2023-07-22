class SavingTargetModel {
  final String description;
  final String endDate;
  final String limit;
  final String currentLimit;
  final String budgetName;

  SavingTargetModel({
    required this.description,
    required this.endDate,
    required this.limit,
    required this.currentLimit,
    required this.budgetName,
  });

  factory SavingTargetModel.fromJson(Map<String, dynamic> json) => SavingTargetModel(
        description: json["description"],
        endDate: json["end_date"],
        limit: json["limit"],
        currentLimit: json["current_limit"],
        budgetName: json["name"],
      );

  Map<String, dynamic> toJson() => {
        "description": description,
        "end_date": endDate,
        "limit": limit,
        "current_limit": currentLimit,
        "name": budgetName,
      };
}
