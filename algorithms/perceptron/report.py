import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from iris import run_iris
from wine import run_wine
from pdf_report import PDFReport
from fpdf.enums import XPos, YPos
from functions import SEGMENTS

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

        plt.figure(figsize=(16, 12))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
        plt.title('Matriz de Confusão')
        plt.yticks(np.arange(3)+0.5, [x for x in classes_list_str])
        plt.xlabel('Preditos')
        plt.xticks(np.arange(3)+0.5, [x for x in classes_list_str])
        plt.ylabel('Positivos')
        pdf.add_plot(plt, x=15, w=80)

        pdf.break_line()

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

# Salvar PDF
pdf.output('algorithms/perceptron/report.pdf')