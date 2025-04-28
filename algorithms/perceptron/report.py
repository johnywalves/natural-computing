from iris import run_iris
from wine import run_wine
from library import PDFReport

report_iris = run_iris()
report_vine = run_wine()

# Criar PDF
pdf = PDFReport()

# Capa
pdf.set_font('Arial_ttf', 'B', 18)
pdf.cell(0, 8, 'Relatório de Modelo Perceptron', align='C')
pdf.break_line()

pdf.set_font('Arial_ttf', '', 12)
pdf.cell(0, 8, 'Johny W. Alves (contato@johnywalves.com.br)', align='C')
pdf.break_line()

# data = (
#     ("First name", "Last name", "Age", "City"),
#     ("Jules", "Smith", "34", "San Juan"),
#     ("Mary", "Ramos", "45", "Orlando"),
#     ("Carlson", "Banks", "19", "Los Angeles"),
#     ("Lucas", "Cimon", "31", "Saint-Mahturin-sur-Loire"),
# )
# line_height = pdf.font_size * 2.5
# col_width = pdf.epw / 4 
# for row in data:
#     for datum in row:
#         pdf.multi_cell(col_width, line_height, datum, border=1, ln=3)
#     pdf.ln(line_height)

for row in report_vine:
    for elem in row:
        pdf.cell(0, 8, elem['accuracy'])
    pdf.break_line()

# Salvar PDF
pdf.output('algorithms/perceptron/report.pdf')