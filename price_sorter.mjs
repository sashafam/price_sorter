import { createClient } from '@supabase/supabase-js';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  persistSession: false,
});
const chatId = process.env.TELEGRAM_CHAT_ID2;
const telegramToken = process.env.TELEGRAM_TOKEN2; // Telegram Bot Token from environment variables

const bot = new TelegramBot(telegramToken, { polling: false });

async function comparePrices() {
  try {
    const tableNames = ['fitplus', 'Price', 'mercado', 'miproteina', 'nutricore', 'zonafit'];
    const productUrls = [
        'https://fitplus.com.co/shop/testosterona/monster-test-120-caps/',
        'https://fitplus.com.co/shop/proteinas/muscletech-nitro-tech-performance-proteina-4lb-vainilla/',
        'https://fitplus.com.co/shop/creatinas/creatina-met-rx-400g/',
        'https://fitplus.com.co/shop/creatinas/nutrex-creatine-drive-300-gr/',
        'https://fitplus.com.co/shop/multivitaminicos/animal-pak-44-packs/',
        'https://fitplus.com.co/shop/proteinas/muscletech-nitro-tech-whey-gold-proteina-5lb/',
        'https://fitplus.com.co/shop/quemadores/lipo-6-black-hers-60-caps-para-ella-ultra-concentrate/',
        'https://fitplus.com.co/shop/quemadores/hydroxycut-harcore-elite-100-caps/',
        'https://fitplus.com.co/shop/pre-entrenos/c4-60-servicios-original-pre-entreno/',
        'https://fitplus.com.co/shop/quemadores/the-curse-creatina-30-servicios/',
        'https://fitplus.com.co/shop/pre-entrenos/the-curse-50-servicios/',
        'https://fitplus.com.co/shop/creatinas/cell-tech-6-lb/',
        'https://fitplus.com.co/shop/quemadores/platinum-100-creatina-400g/',
  
        'https://www.suplementoscolombia.co/monster-test',
        'https://www.suplementoscolombia.co/nitro-tech-4-libras',
        'https://www.suplementoscolombia.co/creatina-drive-nutrex',
        'https://www.suplementoscolombia.co/nitro-tech-whey-gold-5-libras',
        'https://www.suplementoscolombia.co/lipo-6-black-hers',
        'https://www.suplementoscolombia.co/hydroxycut-elite',
        'https://www.suplementoscolombia.co/c4-original-60-servicios',
        'https://www.suplementoscolombia.co/cell-tech-creatina-6-libras',
        'https://www.suplementoscolombia.co/creatina-platinum',
  
      
        'https://miproteina.com.co/angry-supplements/monster-test/',
        'https://miproteina.com.co/muscletech/nitrotech-performance/',
        'https://miproteina.com.co/universal/animal-pak/',
        'https://miproteina.com.co/muscletech/nitrotech-100-whey-gold/',
        'https://miproteina.com.co/nutrex/lipo-6-black-hers-ultra/',
        'https://miproteina.com.co/muscletech/hydroxycut-elite/',
        'https://miproteina.com.co/cellucor/c4-original/',
        'https://miproteina.com.co/muscletech/celltech-performance/',
  
  
        'https://www.nutricore.com.co/producto/451/monster-test-120-caps',
        'https://www.nutricore.com.co/producto/290/nitro-tech-4-lb',
        'https://www.nutricore.com.co/producto/452/creatina-drive-300g',
        'https://www.nutricore.com.co/producto/294/animal-pak-44-pckts',
        'https://www.nutricore.com.co/producto/273/nitro-tech-whey-gold-5-lb',
        'https://www.nutricore.com.co/producto/352/hydroxycut-elite-100-caps',
        'https://www.nutricore.com.co/producto/114/c4-60-servicios',
        'https://www.nutricore.com.co/producto/102/cell-tech-6-lb',
        'https://www.nutricore.com.co/producto/456/platinum-creatina-400g',
        
        'https://articulo.mercadolibre.com.co/MCO-926907954-proteina-whey-nitrotech-4-l-_JM#position=1&search_layout=stack&type=item&tracking_id=20e94875-2d9a-40e7-bf42-32c9cf8410b7',
        'https://articulo.mercadolibre.com.co/MCO-653112693-creatina-en-polvo-met-rx-_JM#position=3&search_layout=stack&type=item&tracking_id=7a2f06c4-4daf-43a5-9d16-1f14f159d0f7',
        'https://articulo.mercadolibre.com.co/MCO-864711396-creatina-300grs-nutrex-envio-_JM#position=3&search_layout=stack&type=item&tracking_id=03df410c-df70-40b4-b7cc-a4737bf83f2b',
        'https://articulo.mercadolibre.com.co/MCO-532983403-nitro-tech-whey-gold-55-libras-muscletech-_JM#position=8&search_layout=stack&type=item&tracking_id=a4f23724-e8cf-42b4-b7e8-b3d67d07ede1',
        'https://articulo.mercadolibre.com.co/MCO-1310477449-hydroxycut-elite-100caps-envio-_JM#position=6&search_layout=stack&type=item&tracking_id=5c02b047-fcb8-4ad0-9ce5-62c4d5248179',
        'https://articulo.mercadolibre.com.co/MCO-1236014815-creatina-300grs-60ser-the-curse-_JM#position=1&search_layout=stack&type=item&tracking_id=8b76cbe9-81c4-4594-b55f-964f7d1170bc',
        'https://articulo.mercadolibre.com.co/MCO-1305021535-the-curse-50-servicios-_JM#position=3&search_layout=stack&type=item&tracking_id=158dfc1a-ed1e-4ce0-a241-777c90300c0c',
        'https://articulo.mercadolibre.com.co/MCO-589220696-cell-tech-6-libras-6lb-lb-muscletech-creatina-_JM#position=2&search_layout=stack&type=item&tracking_id=81249e1c-23e0-4f57-ac74-ddd88abdcdfc',
        'https://articulo.mercadolibre.com.co/MCO-1222754820-creatina-100-pura-platinum-_JM#position=11&search_layout=stack&type=item&tracking_id=2a876c46-9272-4463-86b6-0123709cc5bd',
        
    ];

    const products = [];

    for (const tableName of tableNames) {
      for (const productUrl of productUrls) {
        try {
          // Query to retrieve the price for the given product URL and table
          const { data, error } = await supabase
            .from(tableName)
            .select()
            .eq('productUrl2', productUrl)
            .order('id', { ascending: false })
            .limit(1);

          if (error) {
            console.error(`Error querying table ${tableName} for product ${productUrl}:`, error);
            continue; // Continue to the next product URL
          }

          if (data.length > 0) {
            const price = data[0].price;
            const name = data[0].name; // Get the name from the query result

            // Push the product information into the array
            products.push({ name, productUrl, price });
          }
        } catch (queryError) {
          console.error(`Error executing query for product ${productUrl} in table ${tableName}:`, queryError);
        }
      }
    }

    // Sort the products array based on the price
    products.sort((a, b) => a.price - b.price);

    return products;

  } catch (connectionError) {
    console.error('Error connecting to Supabase:', connectionError);
    return [];
  }
}

async function sendtoTelegram() {
  try {
    const products = await comparePrices();

    const maxProductsPerMessage = 10; // Adjust this based on message length limit

    for (let i = 0; i < products.length; i += maxProductsPerMessage) {
      const productsSubset = products.slice(i, i + maxProductsPerMessage);
      let message = '';

      for (const product of productsSubset) {
        message += `Product: ${product.name}\n`;
        message += `URL: ${product.productUrl}\n`;
        message += `Price: ${product.price}\n\n`;
      }

      await bot.sendMessage(chatId, message);
    }
  } catch (error) {
    console.error('Error in sendtoTelegram:', error);
  }
}

// Command listener for /hello
bot.onText(/\/show_prices/, async (msg) => {
    const chatId = msg.chat.id;
    const message = 'Hello! Activating comparison results...';
    await bot.sendMessage(chatId, message);
  
    await sendtoTelegram();
  
    const finishedMessage = 'Comparison results sent!';
    await bot.sendMessage(chatId, finishedMessage);
  });
  
  // Start the bot's polling loop
  bot.startPolling();
