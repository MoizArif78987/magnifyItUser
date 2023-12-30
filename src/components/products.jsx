import React, { useEffect } from 'react';
import './products.css';

export default function Product({ product }) {
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const scriptId = `shopifyBuyScript-${product.id}`;
      const existingScript = document.getElementById(scriptId);

      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        script.id = scriptId;

        document.body.appendChild(script);

        script.onload = () => {
          window.ShopifyBuyInit = function () {
            const client = window.ShopifyBuy.buildClient({
              domain: '0205bb-2.myshopify.com', // Update with your new Shopify domain
              storefrontAccessToken: 'a53557ca27d15d014f450f660e664162', // Update with new storefront access token
            });

            window.ShopifyBuy.UI.onReady(client).then(function (ui) {
              ui.createComponent('product', {
                id: product.id.toString(),
                node: document.getElementById(`product-component-${product.id}`),
                moneyFormat: '%24%7B%7Bamount%7D%7D', // Change money format to display price in dollars
                options: {
                  product: {
                    styles: {
                      // You can add specific styles if needed
                    },
                    text: {
                      button: 'Add to Cart',
                    },
                  },
                },
              });
            });
          };

          if (window.ShopifyBuy.UI) {
            window.ShopifyBuyInit();
          } else {
            loadScript();
          }

          function loadScript() {
            const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
            const script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = window.ShopifyBuyInit;
          }
        };

        return () => {
          document.body.removeChild(script);
        };
      }
    }
  }, [product]);

  return <div id={`product-component-${product.id}`} className='card'></div>;
}
