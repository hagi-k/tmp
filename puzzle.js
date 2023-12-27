document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('grid');
  const pieces = document.getElementById('pieces');
  const gridSize = 4;
  const pieceSize = 50; // ピースのサイズ（ピクセル）
  const snapThreshold = 10; // 吸着する距離のしきい値

  // グリッドを生成
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
  }

  // パズルピースを生成
  for (let i = 0; i < gridSize * gridSize; i++) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.top = `${Math.floor(i / gridSize) * (pieceSize + 10)}px`;
    piece.style.left = `${(i % gridSize) * (pieceSize + 10)}px`;
    pieces.appendChild(piece);

    // ドラッグアンドドロップ機能
    piece.addEventListener('mousedown', function(e) {
      const offsetX = e.clientX - piece.getBoundingClientRect().left;
      const offsetY = e.clientY - piece.getBoundingClientRect().top;

      function onMouseMove(e) {
        piece.style.left = `${e.clientX - offsetX}px`;
        piece.style.top = `${e.clientY - offsetY}px`;
      }

      function onMouseUp() {
        // 吸着判定
        const pieceRect = piece.getBoundingClientRect();
        const closestCell = getClosestCell(pieceRect);
        if (closestCell && isCloseEnough(pieceRect, closestCell.getBoundingClientRect(), snapThreshold)) {
          piece.style.left = `${closestCell.offsetLeft}px`;
          piece.style.top = `${closestCell.offsetTop}px`;
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  // 最も近いグリッドセルを取得
  function getClosestCell(pieceRect) {
    let closest = null;
    let closestDistance = Infinity;
    grid.querySelectorAll('.cell').forEach(cell => {
      const cellRect = cell.getBoundingClientRect();
      const distance = Math.hypot(cellRect.left - pieceRect.left, cellRect.top - pieceRect.top);
      if (distance < closestDistance) {
        closest = cell;
        closestDistance = distance;
      }
    });
    return closest;
  }

  // 指定された距離内にあるか判定
  function isCloseEnough(rect1, rect2, threshold) {
    return Math.abs(rect1.left - rect2.left) < threshold && Math.abs(rect1.top - rect2.top) < threshold;
  }
});
