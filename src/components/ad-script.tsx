
import Script from 'next/script';

export function AdScript() {
  return (
    <div className="flex justify-center my-4" style={{minHeight: '90px'}}>
      <div style={{ width: '728px', height: '90px' }}>
        <Script
          id={`ad-options-${Math.random()}`}
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : 'ef44c02832896a1dec92310fee06f799',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `,
          }}
        />
        <Script
          id={`ad-invoke-${Math.random()}`}
          strategy="lazyOnload"
          src="//www.highperformanceformat.com/ef44c02832896a1dec92310fee06f799/invoke.js"
        />
      </div>
    </div>
  );
}
