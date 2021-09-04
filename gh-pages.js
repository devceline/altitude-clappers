var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'git@github.com:shaheensarafa/altitude-clappers.git', // Update to point to your repository  
        user: {
            name: 'Shaheen Sarafa', 
            email: 'contact@devshaheen.com' 
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)