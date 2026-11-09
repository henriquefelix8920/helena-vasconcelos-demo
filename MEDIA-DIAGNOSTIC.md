# Auditoria de mídia — 9 de novembro de 2026

## Resultado da verificação de caminhos

Os nomes referenciados pelo HTML correspondem aos arquivos existentes no repositório:

### Imagens referenciadas

| Caminho | Tamanho no GitHub | Resposta da Vercel |
|---|---:|---|
| `assets/images/hero-portrait.png` | 8.770.329 bytes | HTTP 200 · image/png |
| `assets/images/about-portrait.png` | 8.235.750 bytes | HTTP 200 · image/png |
| `assets/images/manifesto-food.png` | 8.477.793 bytes | HTTP 200 · image/png |
| `assets/images/movement-still.png` | 8.519.600 bytes | HTTP 200 · image/png |

Total das quatro imagens: aproximadamente **34 MB**.

### Vídeos referenciados

| Caminho | Tamanho | Resposta da Vercel | Marcadores de codec |
|---|---:|---|---|
| `assets/videos/hero-film.mp4` | 2.825.771 bytes | HTTP 200 · video/mp4 | H.264 (avc1) + AAC (mp4a) |
| `assets/videos/movement-film.mp4` | 7.163.710 bytes | HTTP 200 · video/mp4 | H.264 (avc1) + AAC (mp4a) |

Os dois vídeos existem nos caminhos corretos e usam codecs comuns em navegadores modernos.

## Conclusão

Não foi encontrada divergência entre nomes, pastas e caminhos do HTML. Os arquivos também foram encontrados na publicação com tipo de conteúdo correto. Portanto, a evidência consultada **não aponta para erro de nome ou arquivo ausente**.

O principal problema de desempenho identificado é o peso das fotografias: cada PNG tem cerca de 8–9 MB. Em rede móvel ou em aparelhos com pouca memória, isso pode atrasar o carregamento e a decodificação das imagens.

Há também um arquivo adicional chamado `hero-portrait.png` na raiz do repositório. O site não o utiliza; a referência correta está em `assets/images/hero-portrait.png`. Ele é uma cópia fora da pasta de mídia esperada.

## Correções aplicadas no código

1. A reprodução dos vídeos tem fallback explícito quando o navegador bloqueia autoplay.
2. Se uma tentativa inicial falhar e outra posterior funcionar, a classe de erro é removida corretamente.
3. Um botão acessível **Reproduzir cena** aparece quando o usuário precisa iniciar o vídeo manualmente.
4. Com `prefers-reduced-motion`, os vídeos ficam pausados por padrão, mas o usuário pode iniciá-los manualmente.
5. O poster/fallback permanece visível quando a reprodução não começa.

## Otimização recomendada para a próxima rodada

Converter os quatro PNGs em WebP ou AVIF, preservando boa qualidade e o corte atual. Uma meta razoável é tentar ficar abaixo de 500–700 KB por foto, ajustando a qualidade visualmente. Isso não foi feito automaticamente nesta rodada; os arquivos atuais continuam preservados.

Ferramenta gratuita sugerida: https://squoosh.app — a compressão é executada localmente no navegador, sem enviar as imagens para um serviço externo. Referência: https://github.com/GoogleChromeLabs/squoosh

Ao finalizar as conversões, adicionar as novas imagens com nomes e extensões reais e atualizar os caminhos no HTML. Não basta renomear PNG para WebP.
