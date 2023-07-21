import pandas as pd
import requests
import json

df = pd.read_csv('userdata2.csv')

for(i, row) in df.iterrows():
    print({
        "user": 1,
        "account": 1,
        "category": row['category'].upper()[:3],
        "transaction_type": row['type'],
        "amount": row['amount'],
        "timestamp": row['timestamp'],
        "description": "dummy description",
        "narration": row["narration"],
        "initial_balance": row['initialBalance'],
        "mode": row['mode'][:3]
    })

    json_data = json.dumps({
        "account": 3,
        "category": row['category'].upper()[:3],
        "transaction_type": row['type'],
        "amount": row['amount'],
        "timestamp": row['timestamp'],
        "description": "dummy description",
        "narration": row["narration"],
        "initial_balance": row['initialBalance'],
        "mode": row['mode'][:3]
    })

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwMjM2NTY3LCJpYXQiOjE2ODk5NzczNjcsImp0aSI6ImZjYmRhZGFlZGY3NDRhYzU4ZTYxZDI0MTkwMjA4YWEwIiwidXNlcl9pZCI6Nn0.CNOxzuji_Pstwvhhog2WsFnKVkDQC6TYfbTMx6qNPes',
    }

    requests.post('http://127.0.0.1:8000/api/bank/transaction/', headers=headers, data=json_data)