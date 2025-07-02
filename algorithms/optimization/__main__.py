import os
import numpy as np
import matplotlib.pyplot as plt

from pdf_report import PDFReport

from particles import pso, rosenbrock
from ants import ACO

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
pdf.chapter_title('Particle Swarm Optimization (PSO)')

# Parâmetros
bounds = [(-5, 5), (-5, 5)]
num_particles = 50
max_iter = 100
w = 0.729
c1 = 1.49445
c2 = 1.49445

# Rodar PSO
best_position, best_value, min_values, avg_values = pso(bounds, num_particles, max_iter, w, c1, c2)

# Parâmetros
pdf.add_bold("Parâmetros")
pdf.add_text(f"Número de Partículas: {num_particles}")
pdf.add_text(f"Número de Iterações: {max_iter}")
pdf.add_text(f"Inércia: {max_iter}")
pdf.add_text(f"Coeficiente Cognitivo: {max_iter}")
pdf.add_text(f"Coeficiente Social: {max_iter}")
pdf.ln()

# Resultados
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
pdf.add_text(f"PSO f({best_position[0]:.4f}, {best_position[1]:.4f}) = {rosenbrock(best_position[0], best_position[1]):.6f}")
pdf.add_text(f"GA f({0.89}, {0.74}) = {rosenbrock(0.89, 0.74)}")
pdf.ln()
pdf.add_text("O PSO apresentou uma convergência mais rápida que os GA, especialmente nas primeiras iterações")
pdf.add_text("O PSO encontrou o mínimo global com maior precisão que o GA")
pdf.ln()

# ACO
pdf.chapter_title('Ant Colony Optimization (ACO)')

# Carregar dados
fname = os.path.join('data', 'berlin52.tsp')
cities = np.loadtxt(fname, skiprows=6, usecols=(1,2))

# Rodar ACO
aco = ACO(cities)
aco.run()

# Parâmetros
pdf.add_bold("Parâmetros")
pdf.add_text(f"Número de Cidades: {cities.shape[0]}")
pdf.add_text(f"Número de Formigas: {aco.n_ants}")
pdf.add_text(f"Número de Interações: {aco.n_iterations}")
pdf.add_text(f"Influência do Feromônio: {aco.alpha}")
pdf.add_text(f"Influência de Visibilidade: {aco.beta}")
pdf.add_text(f"Taxa de evaporação: {aco.rho}")
pdf.add_text(f"Constante de depósito: {aco.q}")
pdf.ln()

# Resultados
pdf.add_bold("Resultados")
pdf.add_text(f"Melhor caminho encontrado: {aco.best_distance:.2f}")
pdf.ln()

# Geração do gráfico de convergência
plt.figure(figsize=(10, 6))
plt.plot(aco.history, label='Melhor Distância')
plt.title('Convergência do ACO para Berlin52')
plt.xlabel('Iteração')
plt.ylabel('Distância Total')
plt.grid()
plt.legend()
plt.tight_layout()
pdf.add_plot(plt)

# Geração do gráfico de cidade e caminho
plt.figure(figsize=(10, 6))

# Plotar cidades
plt.scatter(cities[:, 0], cities[:, 1], c='red', s=50)

# Plotar caminho
best_path = aco.best_path + [aco.best_path[0]]
plt.plot(cities[best_path, 0], cities[best_path, 1], linewidth=1)

# Adicionar números das cidades
for i, (x, y) in enumerate(cities):
    plt.text(x, y, str(i), fontsize=8)

plt.title(f'Melhor Rota Encontrada - Distância: {aco.best_distance:.2f}')
plt.xlabel('Coordenada X')
plt.ylabel('Coordenada Y')
plt.grid()
plt.tight_layout()
pdf.add_plot(plt)

# Salvar PDF
pdf.output('algorithms/optimization/report.pdf')