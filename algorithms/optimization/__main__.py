import os
import matplotlib.pyplot as plt
from pdf_report import PDFReport
from particles import pso

# Criar PDF
pdf = PDFReport()

# Capa
pdf.set_font('Arial_ttf', 'B', 18)
pdf.cell(0, 8, 'Relatório de PSO e ASO', align='C')
pdf.break_line(height=3)

pdf.set_font('Arial_ttf', '', 10)
pdf.cell(0, 8, 'Johny W. Alves (contato@johnywalves.com.br)', align='C')
pdf.break_line(height=2)
pdf.cell(0, 8, 'Fonte disponível em https://github.com/johnywalves/natural-computing', align='C')
pdf.break_line()

# PSO
pdf.chapter_title('Particle Swarm Optimization')

# Parâmetros
bounds = [(-5, 5), (-5, 5)]
num_particles = 50
max_iter = 100
w = 0.729
c1 = 1.49445
c2 = 1.49445

# Rodar PSO
best_position, best_value, min_values, avg_values = pso(bounds, num_particles, max_iter, w, c1, c2)

pdf.add_bold("Parâmetros")
pdf.add_text(f"Número de Partículas: {num_particles}")
pdf.add_text(f"Número de Iterações: {max_iter}")
pdf.add_text(f"Inércia: {max_iter}")
pdf.add_text(f"Coeficiente Cognitivo: {max_iter}")
pdf.add_text(f"Coeficiente Social: {max_iter}")
pdf.ln()

# Textos 
pdf.add_bold("Resultados")
pdf.add_text(f"Melhor solução encontrada: x = {best_position[0]:.6f}, y = {best_position[1]:.6f}")
pdf.add_text(f"Valor da função no melhor ponto: {best_value:.6f}")
pdf.ln()

# Geração do gráfico de comparação
plt.figure(figsize=(10, 6))
plt.plot(min_values, label='Valor Mínimo')
plt.plot(avg_values, label='Valor Médio')
plt.xlabel('Iteração')
plt.ylabel('Valor da Função')
plt.title('Convergência do PSO para a Função de Rosenbrock')
plt.legend()
plt.grid()
plt.tight_layout()
pdf.add_plot(plt)

# Apresentar Gráfico GA
pdf.image(os.path.join('figs', "ga_learn.jpg"), x="C", w=210)

# Comparação
pdf.add_bold("Comparação PSO e GA")
pdf.ln()


# Salvar PDF
pdf.output('algorithms/optimization/report.pdf')