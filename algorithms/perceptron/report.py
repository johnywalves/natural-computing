from tensorflow.keras.datasets import mnist
import cv2
import os
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

from pdf_report import PDFReport
from fpdf.enums import XPos, YPos

from iris import run_iris
from wine import run_wine
from functions import SEGMENTS, MAX_EPOCHS
from search import train_nn

report_iris, class_iris = run_iris()
report_vine, class_wine = run_wine()

def report_dataset(title, results, classes):
    pdf.chapter_title(title)

    # Apresentação classes
    classes_list_str = [str(element) for element in classes]
    joined = ', '.join(classes_list_str)

    pdf.set_font('Arial_ttf', 'B', 10)
    pdf.cell(36, 6, 'Classes disponíveis: ', align='L')

    pdf.set_font('Arial_ttf', '', 10)
    pdf.cell(0, 6, joined, align='L')
    pdf.ln()

    pdf.set_font('Arial_ttf', '', 10)
    pdf.multi_cell(0, 8, 'Testando com algoritmos de escala MinMax: (x - min) / (max - min), Standard: (x - média) / desvio padrão, Robusto: (x - mediana) / amplitude interquartil e MáxAbs: x / valor absoluto do max, com máximo de épocas de 50, e taxas de aprendizado de 0.0001, 0.001, 0.01, 0.1 e 1.0 e com sem normalização\n', align='L')
    pdf.multi_cell(0, 8, 'Separação da base de dados Treinamento (70%), Validação (15%) e Teste (15%), os modelos treinados com as variações e escolhido o melhor pela acurácia da classificação\n', align='L')

    # Parâmetros selecionados
    pdf.set_font('Arial_ttf', 'B', 10)
    pdf.cell(0, 6, 'Parâmetros selecionados', align='L')
    pdf.ln()

    line_height = pdf.font_size * 2
    col_width = pdf.epw / 3

    pdf.set_font('Arial_ttf', 'B', 9)
    pdf.multi_cell(col_width, line_height, 'Normalizado', border=1, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.multi_cell(col_width, line_height, 'Escala', border=1, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.multi_cell(col_width, line_height, 'Aprendizado', border=1, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.ln()

    pdf.set_font('Arial_ttf', '', 10)
    pdf.multi_cell(col_width, line_height, results['normalize_state'], border=1, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.multi_cell(col_width, line_height, results['init_scale'], border=1, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.multi_cell(col_width, line_height, results['learning_rate'], border=1, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.break_line()

    # Relatório de evolução
    plt.figure(figsize=(15, 5))

    # Gráfico 1: Convergência treinamento
    epoch_errors = results['epoch_errors']
    plt.subplot(1, 3, 1)
    plt.plot(range(1, MAX_EPOCHS+1), epoch_errors, marker='o')
    plt.title('Convergência treinamento')
    plt.xlabel('Época')
    plt.ylabel('Erro')
    plt.grid(True)

    # Gráfico 2: Validação cruzada
    plt.subplot(1, 3, 2)
    plt.bar(range(1, len(results['cv_scores'])+1), results['cv_scores'])
    plt.axhline(y=np.mean(results['cv_scores']), color='r', linestyle='--')
    plt.title('Validação cruzada')
    plt.xlabel('Fold')
    plt.ylabel('Precisão')
    plt.ylim([0, 1.1])
    for i, score in enumerate(results['cv_scores']):
        plt.text(i+1, score+0.02, f"{score:.3f}", ha='center')

    # Gráfico 3: Curva de aprendizado
    train_sizes, train_scores, val_scores = results['learning_curve']
    plt.subplot(1, 3, 3)
    plt.plot(train_sizes, np.mean(train_scores, axis=1), 'o-', label='Training score')
    plt.plot(train_sizes, np.mean(val_scores, axis=1), 'o-', label='Validation score')
    plt.title('Curva de aprendizado')
    plt.xlabel('Training examples')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)

    plt.tight_layout()
    pdf.add_plot(plt)

    # Resultado por segmentos
    plt.figure(figsize=(15, 5))
    i = 0
    for segment in SEGMENTS:
        i = i + 1
        accuracy = results[segment]['accuracy']
        cm = results[segment]['confusion_matrix']

        plt.subplot(1, 3, i)
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
        plt.title(f"Matriz de Confusão - {segment} Precisão: {accuracy}" )
        plt.yticks(np.arange(3)+0.5, [x for x in classes_list_str])
        plt.xlabel('Preditos')
        plt.xticks(np.arange(3)+0.5, [x for x in classes_list_str])
        plt.ylabel('Positivos')

    plt.tight_layout()
    pdf.add_plot(plt)
    pdf.add_page()

def report_nn(result):
    pdf.set_font('Arial_ttf', 'B', 10)
    pdf.cell(36, 6, result['Arquitetura'], align='L')

    pdf.set_font('Arial_ttf', '', 10)
    pdf.ln()
    pdf.cell(36, 6, f"Acurácia no Teste: {result['Acurácia no Teste']}")
    pdf.ln()
    pdf.cell(36, 6, f"Perdas: {result['Perdas']}")
    pdf.ln()
    pdf.cell(36, 6, f"Tempo por Época: {result['Tempo por Época']}")
    pdf.ln()
    pdf.cell(36, 6, f"Parâmetros: {result['Parâmetros']}")
    pdf.ln()

    pdf.image(result['Plot'], x=80, w=70)
    pdf.break_line()

# Criar PDF
pdf = PDFReport()

# Capa
pdf.set_font('Arial_ttf', 'B', 18)
pdf.cell(0, 8, 'Relatório de Modelo Perceptron', align='C')
pdf.break_line(height=3)

pdf.set_font('Arial_ttf', '', 10)
pdf.cell(0, 8, 'Johny W. Alves (contato@johnywalves.com.br)', align='C')
pdf.break_line(height=2)
pdf.cell(0, 8, 'Fonte disponível em https://github.com/johnywalves/natural-computing', align='C')
pdf.break_line()

# Relatório por datasets
report_dataset('Iris Data Set', report_iris, class_iris)
report_dataset('Wine Data Set', report_vine, class_wine)

# Busca de Redes Neurais
pdf.chapter_title('Escolha seu Conjunto de Dados e Redes Neurais')

pdf.set_font('Arial_ttf', 'B', 10)
pdf.cell(36, 6, 'Sobre os dados', align='L')
pdf.ln()
pdf.chapter_body('O módulo mnist em tensorflow.keras.datasets fornece acesso ao conjunto de dados MNIST, uma coleção de 70.000 imagens em tons de cinza de dígitos manuscritos (0-9). É comumente usado para treinar e testar modelos de aprendizado de máquina, particularmente para tarefas de classificação de imagens. O conjunto de dados é dividido em duas partes: um conjunto de treinamento com 60.000 imagens e um conjunto de teste com 10.000 imagens. Cada imagem tem 28x28 pixels, com valores de pixel variando de 0 a 255.')

# Visualizar alguns exemplos da base de dados
(x_train, y_train), (x_test, y_test) = mnist.load_data()

path_1 = os.path.join('figs', 'sample_1.jpg')
cv2.imwrite(path_1, x_train[0].reshape(28, 28))
pdf.image(path_1, x=90, w=50)

# Treinar modelos
results = train_nn()
for result in results:
    report_nn(result)

# Salvar PDF
pdf.output('algorithms/perceptron/report.pdf')