import pandas as pd
from functions import create_report

def run_iris():
    # Carregar dados
    iris = pd.read_csv('data/iris.csv')
    x, y = iris[['sepal length', 'sepal width', 'petal length', 'petal width']], iris['class']

    # Gerar relatório da base
    return create_report(x, y)
