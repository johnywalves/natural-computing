import pandas as pd
from functions import create_report

FIELDS_IRIS = ['sepal length', 'sepal width', 'petal length', 'petal width']

def run_iris():
    # Carregar dados
    iris = pd.read_csv('data/iris.csv')
    x, y = iris[FIELDS_IRIS], iris['class']

    # Gerar relatório da base
    return create_report(x, y), y.unique()
