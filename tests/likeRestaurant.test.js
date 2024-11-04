describe('Liking A Restaurant', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main role="main" id="main-content"></main>';
  });

  it('should show detail restaurant', async () => {
    expect(document.querySelector('#favorite-button')).toBeTruthy();
  });
});
