import imagemin from 'imagemin';
import imageminPngQuant from 'imagemin-pngquant';
import imageminmozjpeg from 'imagemin-mozjpeg';

export default async ( buffer: Buffer ) => {
  const bufferSize = buffer.toString().length;
  console.log( "old: " + bufferSize );

  let newBuffer = buffer;

  if ( bufferSize >= 4000000 ) {
    let qualityRatio = 4000000 / bufferSize;
    if ( qualityRatio > 0.8 ) qualityRatio = 0.8;
    const minQuality = ( qualityRatio - 0.1 ) < 0 ? 0 : qualityRatio - 0.1;

    newBuffer = await imagemin.buffer( buffer, {
      plugins: [
        imageminmozjpeg( {
          quality: qualityRatio * 100
        } ),
        imageminPngQuant( {
          quality: [
            minQuality,
            qualityRatio
          ]
        } )
      ]
    } );
  }

  return newBuffer;
}
