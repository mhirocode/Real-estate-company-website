// 簡単な振る舞い（教育用）
// - スムーススクロール（ブラウザ標準のscrollIntoViewを利用）
// - フォームの簡易バリデーション（必須項目のチェック）
// コメントを読んで学んでください。

document.addEventListener('DOMContentLoaded', function () {
  // スムーススクロール：ナビや物件のボタンに適用
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      // ページ内リンクかどうかを確認
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // フォーカスを当ててアクセシビリティを向上
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  // フォームバリデーション（非常に基本的なチェック）
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // デモのため送信は止める

    // 必須項目をチェック
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    // 簡単なメール形式チェック（とても基本）
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name) {
      showMessage('お名前を入力してください。', true);
      form.querySelector('#name').focus();
      return;
    }
    if (!email || !emailValid) {
      showMessage('有効なメールアドレスを入力してください。', true);
      form.querySelector('#email').focus();
      return;
    }
    if (!message) {
      showMessage('お問い合わせ内容を入力してください。', true);
      form.querySelector('#message').focus();
      return;
    }

    // ここで実際はサーバーに送信する（例：fetchでAPIへPOST）
    // 教育目的なので成功メッセージを表示してフォームをリセットします。
    showMessage('送信が完了しました。追ってご連絡いたします。', false);
    form.reset();
  });

  function showMessage(text, isError) {
    formMessage.textContent = text;
    formMessage.style.color = isError ? '#b00020' : 'green';
  }
});
