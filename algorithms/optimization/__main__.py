from pdf_report import PDFReport
from fpdf.enums import XPos, YPos

from particles import pso

# Parameters
bounds = [(-5, 5), (-5, 5)]
num_particles = 50
max_iter = 100
w = 0.729
c1 = 1.49445
c2 = 1.49445

# Run PSO
best_position, best_value, min_values, avg_values = pso(bounds, num_particles, max_iter, w, c1, c2)

print(f"Melhor solução encontrada: x = {best_position[0]:.6f}, y = {best_position[1]:.6f}")
print(f"Valor da função no melhor ponto: {best_value:.6f}")