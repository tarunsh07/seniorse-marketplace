document.querySelectorAll('.feedback li').forEach(entry => {
    entry.addEventListener('click', e => {
        if(!entry.classList.contains('active')) {
            const activeEntry = document.querySelector('.feedback li.active');
            if (activeEntry) {
                activeEntry.classList.remove('active');
            }
            entry.classList.add('active');
            
            // Map the class to a numerical rating (1-5)
            const ratings = {
                'angry': 1,
                'sad': 2,
                'ok': 3,
                'good': 4,
                'happy': 5
            };
            
            const ratingValue = ratings[entry.classList[0]];
            document.getElementById('rating-input').value = ratingValue;
        }
        e.preventDefault();
    });
});