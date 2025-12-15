# Gerar `presentation.pptx` (PowerPoint)

Este projeto inclui um script que gera automaticamente um arquivo PowerPoint (`presentation.pptx`) a partir do outline e das notas do apresentador.

Pré-requisitos
- Python 3.8+
- Instalar dependência:

```powershell
pip install python-pptx
```

Arquivos usados
- `slides_outline.txt` — outline dos slides (cada linha sem tab é um título; linhas com um tab são bullets)
- `presenter_notes.md` — notas do apresentador (o script tenta mapear notas por título/slide)

Gerar a apresentação
1. Abra PowerShell na pasta do projeto:

```powershell
cd "C:\Users\MGM TECHNOLOGY\Desktop\site educativo"
```

2. Instale `python-pptx` (se ainda não tiver):

```powershell
pip install python-pptx
```

3. Execute o gerador:

```powershell
python generate_presentation.py
```

4. O arquivo `presentation.pptx` será criado na mesma pasta.

Notas
- Se quiser personalizar slides (fonte, tamanhos, imagens), edite `generate_presentation.py`.
- Se preferir, também é possível importar `slides_outline.txt` diretamente no PowerPoint (Inserir → Slides a partir de Outline).

Problemas comuns
- Erro: ModuleNotFoundError: python_pptx → execute `pip install python-pptx`.
- O script tenta casar títulos das notas com os títulos dos slides; se os títulos não coincidirem, ele coloca as notas gerais na primeira lâmina.

Se quiser, eu posso executar o script aqui, mas preciso que você me confirme para executar comandos no seu ambiente local (não tenho acesso direto ao seu computador). Em alternativa, execute os passos acima e me diga se ocorreu algum erro; vou ajudar a corrigir.