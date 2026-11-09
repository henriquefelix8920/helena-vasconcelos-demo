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

- Transições narrativas entre capítulos usando fundos e tipografia, sem bloquear o scroll.
- Stagger mais refinado para pequenos elementos de texto e números.
- Profundidade em múltiplas camadas de imagem, quando os materiais definitivos estiverem aprovados.
- Vídeo com poster correto, preload seletivo e tratamento de falha.
- Revisão em dispositivos reais, inclusive celular de baixa potência.

## Nota de QA

Os arquivos HTML, CSS e JavaScript foram consultados no GitHub. O JavaScript passou por verificação de sintaxe no ambiente de edição; o CSS apresentou balanço de chaves correto. A versão publicada e os arquivos CSS/JS responderam HTTP 200. Uma inspeção visual automatizada em navegadores de diferentes tamanhos ainda não foi executada.
