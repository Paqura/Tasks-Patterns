import React from 'react'

export const YaMetrika: React.FC = () => {
    const yid = process.env.NEXT_PUBLIC_YM_ID

    if (!yid) {
        return null
    }

    const scriptInjectorHTML = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  `

    return (
        <>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `
                   ${scriptInjectorHTML}
                   ym(${yid}, "init", {
                       clickmap: true,
                       trackLinks: true,
                       accurateTrackBounce: true,
                       webvisor: true
                   });
             `,
                }}
            />
            <noscript>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://mc.yandex.ru/watch/${yid}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    )
}
