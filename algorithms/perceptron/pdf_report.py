from fpdf import FPDF
from io import BytesIO

class PDFReport(FPDF):
    def __init__(self):
        super().__init__()
        self.set_title("Relatório de Algoritmos Genéticos")
        self.add_page()
        self.add_font("Arial_ttf", "", "./assets/ARIAL.TTF")
        self.add_font("arial_ttf", "B", "./assets/ARIALBD.TTF")

    def break_line(self, amount = 1, height = 5):
        self.set_font('Arial_ttf', '', 8)
        self.multi_cell(0, height, '\n' * amount, align='L')

    def section(self, title):
        self.break_line()
        self.set_font('Arial_ttf', 'B', 14)
        self.cell(0, 8, title, align='L')
        self.break_line()

    def chapter_title(self, title):
        self.set_font('Arial_ttf', 'B', 12)
        self.cell(0, 8, title, align='L')
        self.break_line()
    
    def chapter_body(self, body):
        self.set_font('Arial_ttf', '', 12)
        self.multi_cell(0, 8, body)
        self.break_line()

    def chapter(self, title, body):
        self.chapter_title(title)
        self.chapter_body(body)

    # Converte a figura matplotlib para imagem e adiciona ao PDF
    def add_plot(self, fig, x=10, w=190):
        img_data = BytesIO()
        fig.savefig(img_data, format='png', dpi=300)
        img_data.seek(0)
        self.image(img_data, x=x, w=w)
        self.break_line()
