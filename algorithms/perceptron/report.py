import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from iris import run_iris
from wine import run_wine
from pdf_report import PDFReport
from fpdf.enums import XPos, YPos
from functions import SEGMENTS, MAX_EPOCHS

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

    # Gráfico 3: Curva aprendizado
    train_sizes, train_scores, val_scores = results['learning_curve']
    plt.subplot(1, 3, 3)
    plt.plot(train_sizes, np.mean(train_scores, axis=1), 'o-', label='Training score')
    plt.plot(train_sizes, np.mean(val_scores, axis=1), 'o-', label='Validation score')
    plt.title('Learning Curve')
    plt.xlabel('Training examples')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)

    plt.tight_layout()
    pdf.add_plot(plt, x=10, w=190)
    pdf.ln()

    # Resultado por segmentos
    for segment in SEGMENTS:
        accuracy = results[segment]['accuracy']
        cm = results[segment]['confusion_matrix']

        pdf.set_font('Arial_ttf', 'B', 10)
        pdf.cell(0, 6, segment, align='L')
        pdf.ln()

        pdf.set_font('Arial_ttf', '', 10)
        pdf.cell(0, 6, f"Precisão: {accuracy}")
        pdf.ln()

        plt.figure(figsize=(6, 4))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
        plt.title('Matriz de Confusão')
        plt.yticks(np.arange(3)+0.5, [x for x in classes_list_str])
        plt.xlabel('Preditos')
        plt.xticks(np.arange(3)+0.5, [x for x in classes_list_str])
        plt.ylabel('Positivos')

        pdf.add_plot(plt, x=50, w=120)
        pdf.ln()

# Criar PDF
pdf = PDFReport()

# Capa
pdf.set_font('Arial_ttf', 'B', 18)
pdf.cell(0, 8, 'Relatório de Modelo Perceptron', align='C')
pdf.break_line(height=3)

pdf.set_font('Arial_ttf', '', 10)
pdf.cell(0, 8, 'Johny W. Alves (contato@johnywalves.com.br)', align='C')
pdf.break_line()

report_dataset('Iris Data Set', report_iris, class_iris)
report_dataset('Wine Data Set', report_vine, class_wine)

pdf.chapter_title('Escolha seu Conjunto de Dados e Redes Neurais')

pdf.set_font('Arial_ttf', '', 10)
pdf.cell(36, 6, 'https://www.kaggle.com/datasets/shaunthesheep/microsoft-catsvsdogs-dataset', align='L')
pdf.ln()




# Salvar PDF
pdf.output('algorithms/perceptron/report.pdf')