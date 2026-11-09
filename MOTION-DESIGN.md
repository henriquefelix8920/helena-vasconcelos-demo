# Cinematic Motion — Helena Vasconcelos

## O que já está implementado

- Indicador global de progresso de leitura no topo da página.
- Revelação progressiva dos conteúdos ao entrar na viewport, usando IntersectionObserver.
- Máscaras editoriais de recorte para títulos-chave, revelando o texto como uma cena.
- Entrada de imagens com recorte e transição suave.
- Parallax sutil no visual do hero e no interlúdio de movimento.
- Timeline cuja linha de progresso é revelada quando a jornada aparece.
- Microinterações em links, botões, etapas do método e FAQ.
- Menu móvel acessível, navegação ativa por seção e suporte à tecla Escape.

## Princípios de implementação

1. O visitante mantém controle total do scroll; não há scroll hijacking nem seções que prendem a rolagem.
2. Os efeitos não podem esconder conteúdo essencial.
3. Em telas pequenas, o parallax é desligado e as máscaras dão lugar a transições de opacidade/posição mais leves.
4. Com `prefers-reduced-motion: reduce`, as animações são reduzidas e o conteúdo permanece visível.
5. O progresso do scroll usa requestAnimationFrame e listeners passivos para reduzir trabalho por frame.
6. As animações são feitas com CSS e JavaScript nativos, sem dependência de runtime de terceiros.

## Próximas possibilidades (ainda não implementadas)

- Indicador editorial fixo que troca número, nome e contraste conforme o capítulo ativo, sem bloquear o scroll.
- Identificação de nove momentos narrativos, da abertura ao convite final.
- Stagger mais refinado para pequenos elementos de texto e números.
- Profundidade em múltiplas camadas de imagem, quando os materiais definitivos estiverem aprovados.
- Vídeo com poster correto, preload seletivo e tratamento de falha.
- Revisão em dispositivos reais, inclusive celular de baixa potência.

## Nota de QA

Os arquivos HTML, CSS e JavaScript foram consultados no GitHub. O JavaScript passou por verificação de sintaxe no ambiente de edição; o CSS apresentou balanço de chaves correto. A versão publicada e os arquivos CSS/JS responderam HTTP 200. Uma inspeção visual automatizada em navegadores de diferentes tamanhos ainda não foi executada.


## Diagnóstico de mídia — 9 de novembro de 2026

- Os quatro caminhos de imagem usados no HTML existem em `assets/images/` e respondem HTTP 200 com `image/png`.
- Os dois caminhos de vídeo usados no HTML existem em `assets/videos/` e respondem HTTP 200 com `video/mp4`.
- Todas as quatro imagens PNG fornecidas medem 2813 × 1536 px e pesam aproximadamente 8,2–8,8 MB. O formato é paisagem, embora os blocos de retrato do site tenham moldura vertical; o enquadramento pode cortar partes da composição. Converter para WebP com qualidade visual alta e criar recortes apropriados reduzirá tempo de carregamento.
- O arquivo `hero-portrait.png` duplicado na raiz do repositório foi removido. A cópia canônica em `assets/images/hero-portrait.png` permanece.
- O carregamento de vídeo foi alterado para iniciar apenas próximo da viewport; ao falhar, a imagem/poster continua como fallback. Com `prefers-reduced-motion`, o vídeo permanece estático para respeitar a preferência do usuário.
- Os nomes e URLs foram verificados, mas ainda não houve inspeção visual em aparelhos físicos; a causa específica de eventuais falhas vistas no Chromebook ainda não está confirmada.


## Atualização — capítulos navegáveis e transições de atmosfera

- O indicador lateral agora contém nove marcadores clicáveis; cada marcador leva diretamente ao capítulo correspondente.
- O capítulo ativo é identificado com `aria-current="step"`, inclusive para navegação assistiva.
- O cabeçalho fixo muda entre atmosfera clara e escura conforme `data-tone` do capítulo ativo, mantendo contraste com o conteúdo.
- O indicador de capítulo continua atualizando número e título com uma transição curta; o visitante mantém o controle da rolagem.

## Atualização — reprodução de vídeo mais robusta

- Se o navegador bloquear autoplay ou o vídeo falhar, o poster/fallback permanece visível.
- Um botão acessível "Reproduzir cena" aparece para permitir tentativa manual.
- Se o usuário tiver preferência de movimento reduzido, o vídeo começa pausado, mas a reprodução manual continua disponível.
- Se uma primeira tentativa falhar e uma tentativa posterior funcionar, o estado de erro é removido para que o vídeo possa aparecer.


## Atualização — cadência editorial das sequências

- Etapas do método, jornada e perguntas frequentes agora entram em sequência curta, em vez de surgirem todas ao mesmo tempo.
- A cadência é progressiva e discreta; o primeiro elemento não recebe atraso.
- A preferência por movimento reduzido continua prevalecendo e mantém o conteúdo imediatamente visível.

## Verificação dos arquivos de mídia — 9 de novembro de 2026

- Os quatro nomes de imagem usados no HTML correspondem exatamente aos arquivos existentes em `assets/images/`.
- Os dois nomes de vídeo usados no HTML correspondem exatamente aos arquivos existentes em `assets/videos/`.
- As seis URLs públicas testadas na produção responderam HTTP 200. Portanto, não há evidência de erro de caminho ou de nome de arquivo.
- As imagens PNG têm aproximadamente 8,2–8,8 MB cada. Esse peso pode causar demora perceptível ou falha intermitente em conexões lentas e aparelhos com pouca memória; otimizar para WebP e gerar versões responsivas será uma etapa própria, quando os materiais finais forem escolhidos.
- A disponibilidade HTTP confirma que os arquivos são servidos, mas não comprova a reprodução visual em todos os navegadores. O vídeo pode depender de codec compatível e de interação do visitante; os controles manuais e o poster/fallback permanecem disponíveis.
