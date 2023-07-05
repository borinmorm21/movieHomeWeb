const apiKey = '79b11e31aa5fe07c5a98d38447890082';

            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    const movies = data.results;
                    const movieCardsContainer = document.querySelector('.container');

                    movies.forEach(movie => {
                        const poster = movie.poster_path;
                        const posterUrl = 'https://image.tmdb.org/t/p/w500/';

                        const movieCard = document.createElement('div');
                        movieCard.classList.add('movie-card');
                        movieCard.dataset.movieId = movie.id; // Set the movie ID as a data attribute

                        movieCard.innerHTML = `
                            <a href="#" onclick="showMovieInfo(${movie.id})">
                                <img src="${posterUrl}${poster}" alt="movie">
                                <div class="content">
                                    <h4 class="title">${movie.title}</h4>
                                    <div class="date_rating">
                                        <p class="release-date">${movie.release_date}</p>
                                        <p class="rating">${movie.vote_average} <i class="fas fa-star"></i></p>
                                    </div>
                                </div>
                            </a>
                        `;
                        movieCardsContainer.appendChild(movieCard);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            function showMovieInfo(movieId) {
                const modal = document.getElementById('modal');
                const modalPoster = document.getElementById('modal-poster');
                const modalTitle = document.getElementById('modal-title');
                const modalReleaseDate = document.getElementById('modal-release-date');
                const modalGenre = document.getElementById('modal-genre');
                const modalLanguage = document.getElementById('modal-language');
                const modalRating = document.getElementById('modal-rating');
                const modalOverview = document.getElementById('modal-overview');

                fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        const posterUrl = 'https://image.tmdb.org/t/p/w500/';

                        modalPoster.src = `${posterUrl}${data.poster_path}`;
                        modalTitle.innerHTML = data.title;
                        modalReleaseDate.innerHTML = `<span>Release Date: </span>${data.release_date}`;
                        modalGenre.innerHTML = `<span>Genre: </span>${data.genres.map(genre => genre.name).join(', ')}`;
                        modalLanguage.innerHTML = `<span>Language: </span>${data.original_language}`;
                        modalRating.innerHTML = `<span>Rating: </span>${data.vote_average}`;
                        modalOverview.innerHTML = `<span>Overview: </span>${data.overview}`;

                        modal.style.visibility = 'visible';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }

            function closeModal() {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'hidden';
            }

            // search bar
            const searchButton = document.getElementById('search-button');
            searchButton.addEventListener('click', searchMovies);

            function searchMovies() {
                const searchInput = document.getElementById('search-input').value;
                const encodedSearchInput = encodeURIComponent(searchInput);
                const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodedSearchInput}&api_key=${apiKey}`;

                fetch(searchUrl)
                    .then(response => response.json())
                    .then(data => {
                        const movies = data.results;
                        const movieCardsContainer = document.querySelector('.container');
                        movieCardsContainer.innerHTML = ''; // Clear previous movie cards

                        movies.forEach(movie => {
                            const poster = movie.poster_path;
                        const posterUrl = 'https://image.tmdb.org/t/p/w500/';

                        const movieCard = document.createElement('div');
                        movieCard.classList.add('movie-card');
                        movieCard.dataset.movieId = movie.id; // Set the movie ID as a data attribute

                        movieCard.innerHTML = `
                            <a href="#" onclick="showMovieInfo(${movie.id})">
                                <img src="${posterUrl}${poster}" alt="movie">
                                <div class="content">
                                    <h4 class="title">${movie.title}</h4>
                                    <div class="date_rating">
                                        <p class="release-date">${movie.release_date}</p>
                                        <p class="rating">${movie.vote_average} <i class="fas fa-star"></i></p>
                                    </div>
                                </div>
                            </a>
                        `;
                        movieCardsContainer.appendChild(movieCard);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }