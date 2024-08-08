document.getElementById('searchButton').addEventListener('click', async () => {
    const username = document.getElementById('query').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Limpar resultados anteriores

    if (!username) {
        alert('Por favor, insira um nome de usuário.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&order=desc`);
        const repos = await response.json();

        if (Array.isArray(repos) && repos.length > 0) {
            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo');
                repoElement.innerHTML = `
                    <strong>${repo.full_name}</strong><br>
                    ⭐ ${repo.stargazers_count} estrelas<br>
                    <a href="${repo.html_url}" target="_blank">Ver Repositório</a>
                `;
                resultsContainer.appendChild(repoElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>Nenhum repositório encontrado para este usuário.</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        resultsContainer.innerHTML = '<p>Erro ao buscar dados. Tente novamente mais tarde.</p>';
    }
});