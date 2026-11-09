# Guia de imagens e vídeos

Todos os arquivos desta lista são materiais de produção a serem adicionados posteriormente. Os cenários gráficos atuais são placeholders intencionais; não representam fotografias reais.

## Imagens

| Arquivo | Onde aparece | Direção visual |
|---|---|---|
| `assets/images/hero-portrait.webp` | Retrato principal da abertura | Retrato horizontal/vertical amplo, mulher adulta fictícia em consultório contemporâneo, blazer marfim, luz natural lateral, paleta oliva e areia, expressão acolhedora e segura. |
| `assets/images/manifesto-food.webp` | Seção “A alimentação precisa caber na vida” | Fotografia editorial de ingredientes frescos e mesa natural, detalhes de textura, luz lateral quente, composição ampla. |
| `assets/images/movement-still.webp` | Fundo da seção “Saúde também acontece na vida real” | Cena de movimento leve e cotidiano, luz da manhã, ambiente natural, enquadramento cinematográfico horizontal. |
| `assets/images/about-portrait.webp` | Apresentação de Helena | Retrato editorial da mesma personagem do hero, mesma aparência, cabelo, idade aparente e direção de fotografia. |

**Consistência da personagem:** utilizar sempre a mesma imagem de referência aprovada para manter rosto, cabelo, tom de pele, idade aparente e identidade visual. Helena é fictícia.

## Vídeos

| Arquivo | Onde será usado | Roteiro visual |
|---|---|---|
| `assets/videos/hero-film.mp4` | Fundo/apoio da abertura | Plano de 6–8 segundos: Helena no consultório, movimento sutil de câmera, luz natural atravessando o ambiente. Sem fala, sem texto embutido e sem gestos exagerados. |
| `assets/videos/movement-film.mp4` | Seção “Saúde também acontece na vida real” | Plano de 6–10 segundos: movimento cotidiano ou atividade física leve em ambiente iluminado; câmera acompanha suavemente a ação. |
| `assets/videos/consultation-film.mp4` | Futura cena de apoio ao método | Plano de 6–8 segundos: conversa acolhedora entre profissional fictícia e paciente adulta; enquadramento lateral, sem mostrar documentos ou dados pessoais. |
| `assets/videos/food-details-film.mp4` | Futura cena de alimentos | Plano macro de 5–7 segundos: ingredientes sendo preparados, mãos em movimento, textura e luz natural, estética editorial. |

## Formatos recomendados

- Fotografias: WebP, preferencialmente 1800–2400 px no lado maior, qualidade aproximada 80–88%.
- Vídeos: MP4/H.264, 1920×1080 para desktop, 6–10 segundos, sem áudio, loop suave quando fizer sentido.
- Mobile: preparar versões verticais ou recortes específicos quando a composição horizontal perder a personagem.
- Evitar arquivos excessivamente pesados. Vídeos curtos devem ser comprimidos para carregamento rápido.

## Como adicionar

1. Abra a pasta correspondente no GitHub.
2. Selecione **Add file → Upload files**.
3. Envie o arquivo usando exatamente o nome da tabela.
4. Faça commit na branch principal.
5. Recarregue o site publicado para conferir o resultado.

Os caminhos já estão previstos no projeto. Quando a etapa audiovisual começar, o HTML receberá os elementos de vídeo e as instruções finais de integração. Não renomeie os arquivos sem atualizar o código.

## Direitos e transparência

Use imagens e vídeos gerados especificamente para a personagem fictícia ou devidamente licenciados. Não utilize a aparência de uma nutricionista real sem autorização expressa. Não simule depoimentos, pacientes reais, resultados clínicos ou recomendações médicas.


## Se a ferramenta gerar PNG ou JPG

Não troque a extensão manualmente. Um arquivo PNG precisa continuar com extensão `.png`; JPG precisa continuar `.jpg`. O HTML pode ser atualizado para apontar para qualquer extensão. Exemplo: se a imagem oficial sair em PNG, envie como `assets/images/hero-portrait.png` e me avise; eu atualizo o caminho do site. A mesma regra vale para as outras imagens e vídeos.

**Para a primeira imagem:** como o gerador do Qwen entregou PNG, salve o arquivo como `hero-portrait.png` dentro de `assets/images/`. Não precisa anexar na conversa: depois que o arquivo estiver no GitHub, eu consigo consultar o material pelo site/repositório.

**Ordem das próximas imagens:**
1. Produza a foto de alimentação sem referência de rosto.
2. Produza a foto de movimento usando o retrato oficial de Helena como referência.
3. Produza a foto da seção Sobre usando exatamente a mesma referência do retrato oficial.
4. Envie as imagens para `assets/images/` com seus nomes-base correspondentes; mantenha a extensão real do arquivo.
