import pandas as pd
import os
import certifi
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

DB_STRING = os.environ.get('DB_STRING')

client = MongoClient(DB_STRING, tlsCAFile=certifi.where())
database = client['wordle_stats']
collection = database['entries']

def csv_to_json(filename):
    data = pd.read_csv(filename, header = 0)
    return data.to_dict('records')


collection.insert_many(csv_to_json('wordle2.csv'))


