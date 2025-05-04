import pandas as pd
from functions import create_report

FIELDS_WINE = ['Alcohol', 'Malic acid', 'Ash', 'Alcalinity of ash', 'Magnesium', 'Total phenols', 'Flavanoids', 'Nonflavanoid phenols', 'Proanthocyanins', 'Color intensity', 'Hue', 'OD280/OD315 of diluted wines', 'Proline']

def run_wine():
    # Carregar dados
    wine = pd.read_csv('data/wine.csv')
    x, y = wine[FIELDS_WINE], wine['Class']

    # Gerar relatório da base
    return create_report(x, y), y.unique()
