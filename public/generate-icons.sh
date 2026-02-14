#!/bin/bash
# Script para gerar ícones PNG a partir do SVG
# Requer ImageMagick ou similar instalado

if command -v convert &> /dev/null; then
    convert -background none icon.svg -resize 192x192 icon-192.png
    convert -background none icon.svg -resize 512x512 icon-512.png
    echo "Ícones gerados com sucesso!"
elif command -v sips &> /dev/null; then
    # macOS built-in tool
    echo "Por favor, use uma ferramenta online para converter icon.svg para PNG"
    echo "Ou instale ImageMagick: brew install imagemagick"
else
    echo "Por favor, converta icon.svg para icon-192.png e icon-512.png manualmente"
    echo "Pode usar: https://cloudconvert.com/svg-to-png"
fi
