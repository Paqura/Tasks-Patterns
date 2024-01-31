/** @type {import('stylelint').Config} */
module.exports = {
    extends: ['stylelint-config-recommended', 'stylelint-config-css-modules'],
    plugins: [
        'stylelint-order',
        'stylelint-declaration-block-no-ignored-properties',
        'stylelint-scss',
    ],
    customSyntax: 'postcss-scss',
    rules: {
        'selector-max-id': 0,
        'max-nesting-depth': 4,
        'declaration-no-important': true,
        'plugin/declaration-block-no-ignored-properties': true,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'string-no-newline': true,
        'color-hex-length': 'long',
        'color-no-invalid-hex': true,
        'at-rule-empty-line-before': [
            'always',
            {
                except: ['blockless-after-same-name-blockless', 'first-nested'],
                ignore: ['after-comment'],
            },
        ],
        'selector-pseudo-element-colon-notation': 'double',
        'order/properties-order': [
            'all',
            'position',
            'z-index',
            'top',
            'right',
            'left',
            'bottom',

            'margin',
            'margin-x',
            'margin-y',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-x',
            'padding-y',
            'padding-top',
            'padding-right',
            'padding-left',
            'padding-bottom',

            'display',
            'visibility',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'clip',
            'zoom',
            'flex-direction',
            'flex-order',
            'flex-pack',
            'flex-align',

            'box-sizing',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',

            'table-layout',
            'empty-cells',
            'caption-side',
            'border-spacing',
            'border-collapse',
            'list-style',
            'list-style-position',
            'list-style-type',
            'list-style-image',

            'font',
            'font-family',
            'font-size',
            'font-weight',
            'font-style',
            'font-variant',
            'font-size-adjust',
            'font-stretch',
            'font-effect',
            'font-emphasize',
            'font-emphasize-position',
            'font-emphasize-style',
            'font-smooth',
            'line-height',
            'text-align',
            'text-align-last',
            'vertical-align',
            'white-space',
            'text-decoration',
            'text-emphasis',
            'text-emphasis-color',
            'text-emphasis-style',
            'text-emphasis-position',
            'text-indent',
            'text-justify',
            'letter-spacing',
            'word-spacing',
            'text-outline',
            'text-transform',
            'text-wrap',
            'text-overflow',
            'text-overflow-ellipsis',
            'text-overflow-mode',
            'text-shadow',
            'word-wrap',
            'word-break',
            'tab-size',
            'hyphens',

            'cursor',
            'user-select',
            'pointer-events',

            'content',
            'quotes',
            'counter-reset',
            'counter-increment',
            'resize',

            'nav-index',
            'nav-up',
            'nav-right',
            'nav-down',
            'nav-left',

            'color',
            'background',
            'background-color',
            'background-image',
            'background-repeat',
            'background-attachment',
            'background-position',
            'background-position-x',
            'background-position-y',
            'background-clip',
            'background-origin',
            'background-size',
            'border',
            'border-width',
            'border-style',
            'border-color',
            'border-top',
            'border-top-width',
            'border-top-style',
            'border-top-color',
            'border-left',
            'border-left-width',
            'border-left-style',
            'border-left-color',
            'border-right',
            'border-right-width',
            'border-right-style',
            'border-right-color',
            'border-bottom',
            'border-bottom-width',
            'border-bottom-style',
            'border-bottom-color',
            'border-radius',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius',
            'border-image',
            'border-image-source',
            'border-image-slice',
            'border-image-width',
            'border-image-outset',
            'border-image-repeat',
            'outline',
            'outline-width',
            'outline-style',
            'outline-color',
            'outline-offset',
            'opacity',
            'box-shadow',
            'box-decoration-break',

            'transition',
            'transition-duration',
            'transition-delay',
            'transition-timing-function',
            'transition-property',
            'transform',
            'transform-origin',
            'animation',
            'animation-name',
            'animation-duration',
            'animation-play-state',
            'animation-timing-function',
            'animation-delay',
            'animation-iteration-count',
            'animation-direction',
            'backface-visibility',
            'will-change',
        ],
    },
}