let needMining = false;
let miningUrl = '';

onmessage = function(e) {
  console.log(e.data.launch ? 'Launching mining ...' : 'Stopping Mining...');

  if (e.data.launch !== null && e.data.launch !== undefined) {
    needMining = e.data.launch;
  }

  miningUrl = e.data.miningUrl ? e.data.miningUrl : miningUrl;

  mineBlock();
};

function mineBlock() {
  if (needMining) {
    fetch(miningUrl, { method: 'POST' }).then(data => {
      console.log('Block mined !');
      postMessage(true);
      mineBlock();
    });
  }
}

mineBlock();
