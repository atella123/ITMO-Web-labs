const canvas = document.getElementById('graph');

if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, 300, 150);

    ctx.lineWidth = 5;
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.strokeRect(0, 0, 300, 150);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
}
