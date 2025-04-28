import pandas as pd
from functions import create_report

def run_wine():
    # Carregar dados
    wine = pd.read_csv('data/wine.csv')
    y = wine['Class']
    x = wine.drop(columns='Class')

    # Gerar relatório da base
    return create_report(x, y)
