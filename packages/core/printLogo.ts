export default function () {
  if (PROD) {
    const logo = `
________________________________________________
  
                               .__.__                
 ___.__.__ __   ____  _____|__|  |  __ __  ____  
<   |  |  |  \_/ __ \/ ____/  |  | |  |  \/  _ \ 
 \___  |  |  /\  ___< <_|  |  |  |_|  |  (  <_> )
 / ____|____/  \___  >__   |__|____/____/ \____/ 
 \/                \/   |__|                     
                                             
________________________________________________
                author:EricWXY
  `;

    const rainbowGradient = `
  background: linear-gradient(135deg, orange 60%, cyan);
  background-clip: text;
  color: transparent;
  font-size: 16px; 
  line-height: 1;
  font-family: monospace;
  font-weight: 600;
  `;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[EricUI]:dev mode...");
  }
}
