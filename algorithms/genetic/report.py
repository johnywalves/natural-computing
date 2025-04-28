import matplotlib.pyplot as plt
import bitstring
import maximization
import rosenbrock
from library import PDFReport

def generate_convergence_plot(result_tournament, result_roulette, result_sus, title):
    plt.figure(figsize=(10, 4))
    plt.plot(result_tournament, label='Torneio')
    plt.plot(result_roulette, label='Roleta')
    plt.plot(result_sus, label='SUS')
    plt.title(title)
    plt.xlabel('Geração')
    plt.ylabel('Média de Fitness')
    plt.legend()
    plt.grid(True)
    return plt

def generate_elitism_plot(pop_size, elite_size):
    best_result = rosenbrock.genetic_algorithm(pop_size=pop_size, elite_size=elite_size)

    plt.figure(figsize=(10, 4))
    plt.plot(best_result['history']['best'], label='Melhor Fitness')
    plt.plot(best_result['history']['average'], label='Fitness Médio')
    plt.title(f"Melhor Execução (População={pop_size}, Elitismo={elite_size}%, Melhor X {best_result['best_x']:.2f}, Melhor Y {best_result['best_y']:.2f})")
    plt.xlabel('Geração')
    plt.ylabel('Valor da Função')
    plt.legend()
    plt.grid(True)
    return plt, best_result

def generate_full_report():
    # Criar PDF
    pdf = PDFReport()
    
    # Capa
    pdf.set_font('Arial_ttf', 'B', 18)
    pdf.cell(0, 8, 'Relatório de Algoritmos Genéticos', align='C')
    pdf.break_line()

    pdf.set_font('Arial_ttf', '', 12)
    pdf.cell(0, 8, 'Johny W. Alves (contato@johnywalves.com.br)', align='C')
    pdf.break_line()

    # Reconhecimento de Padrões
    crossover_only, mutation_only, both = bitstring.compare_operators()

    pdf.section('1. Reconhecimento de Padrões')
    into_bitstring = f"""Algoritmo genético para o exemplo de reconhecimento de padrões população de {bitstring.POP_SIZE} elementos com execução de {bitstring.GENERATIONS_BY_RATE} por configuração, para reconhecer {bitstring.TARGET} """
    pdf.chapter_body(into_bitstring)

    pdf.chapter('1.1 Crossover', crossover_only)
    pdf.chapter('1.2 Mutação', mutation_only)
    pdf.chapter('1.2 Ambos', both)

    # Maximização de Função
    pdf.section('2. Maximização de Função')
    pdf.chapter_body("Algoritmo genético para maximizar a definida por:")
    pdf.image('assets/equation.png', x="C", w=120)
    pdf.break_line(2)

    method_text = f"""Foram implementados:
- Algoritmo Genético com 3 métodos de seleção (torneio, roleta e SUS)
- Subida da Colina com representação binária
- Recozimento Simulado com representação binária

Parâmetros do Algoritmo Genético:
- Tamanho da população: {maximization.POP_SIZE} indivíduos
- Comprimento da bitstring: {maximization.BITSTRING_LENGTH} bits
- Taxa de crossover: {bitstring.DEFAULT_CROSSOVER * 100}%
- Taxa de mutação: {bitstring.DEFAULT_MUTATION * 100}%"""
    pdf.chapter('2.1. Metodologia', method_text)

    avg_ga, avg_hc, avg_sa = maximization.compare_algorithms()

    maximization_body = f"""Comparação de Algoritmos (Média de {maximization.RESULT_EXECUTION} execuções):
Algoritmo Genético  • Valor = {avg_ga[0]:.6f}  • Tempo = {avg_ga[1]:.4f}s
Subida da Colina  • Valor = {avg_hc[0]:.6f}  • Tempo = {avg_hc[1]:.4f}s
Recozimento Simulado  • Valor = {avg_sa[0]:.6f}  • Tempo = {avg_sa[1]:.4f}s"""
    pdf.chapter("2.2 Comparação de Algoritmos", maximization_body)

    result_tournament, result_roulette, result_sus = maximization.compare_genetics()
    conv_plot = generate_convergence_plot(result_tournament, result_roulette, result_sus, 'Convergência do Algoritmo Genético')
    pdf.add_plot(conv_plot)
    conv_plot.close()

    # Minimização de Função (Rosenbrock)
    pdf.section('3. Minimização de Função (Rosenbrock)')
    pdf.chapter_body("Algoritmo genético para minimizar a definida por:")
    pdf.image('assets/rosenbrock.png', x="C", w=120)
    pdf.break_line(2)

    pdf.chapter_title('2.1. Resultados')
    
    for pop_size in rosenbrock.POP_SIZE:
        for elitism in rosenbrock.ELITISM_RATES:
            chart, _ = generate_elitism_plot(pop_size, elitism)
            pdf.add_plot(conv_plot)
            chart.close()
    
    # Salvar PDF
    pdf.output('algorithms/genetic/relatorio_algoritmos_geneticos.pdf')

generate_full_report()
