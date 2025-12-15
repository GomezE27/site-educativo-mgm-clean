# Gerar Documento Word (.docx) — Apresentação MGM-TEC GB

Este script gera um documento Microsoft Word pronto para editar com toda a apresentação do projeto.

## Pré-requisitos
- Python 3.8+
- Instalar dependência:

```powershell
pip install python-docx
```

## Gerar o documento

1. Abra PowerShell na pasta do projeto:

```powershell
cd "C:\Users\MGM TECHNOLOGY\Desktop\site educativo"
```

2. Instale `python-docx` (se ainda não tiver):

```powershell
pip install python-docx
```

3. Execute o gerador:

```powershell
python generate_word_document.py
```

4. O arquivo `presentation.docx` será criado na mesma pasta.

5. Abra o arquivo no Microsoft Word e edite conforme necessário (cores, imagens, formatação).

## O que está incluído no documento

- **Título e slogan** do projeto no início
- **10 slides** com:
  - Título do slide
  - Bullets (pontos principais)
  - 📝 Seção de notas do apresentador (em cinza e itálico para fácil identificação)
- **Quebras de página** entre slides para melhor visualização
- **Formatação profissional** com cores (azul e turquesa do projeto)

## Editando no Word

1. Abra `presentation.docx` no Microsoft Word
2. Customize:
   - Cores (Menu: Design)
   - Fontes (selecione texto e use a barra de ferramentas)
   - Adicione imagens (Insert → Pictures)
   - Adicione gráficos ou diagramas conforme necessário
3. Salve as alterações

## Dicas

- As notas do apresentador estão em seção separada; você pode removê-las se quiser apenas slides.
- Pode converter para PDF direto do Word (File → Export as PDF) para compartilhar.
- Se quiser adicionar imagens do site (screenshots), use Insert → Pictures.

Pronto! O documento está formatado e pronto para apresentação. 🎉
