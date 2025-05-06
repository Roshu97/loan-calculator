import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

function About() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>About This App</Typography>
      
      <Typography paragraph>
        This Loan Calculator App is a modern, single-page web application built using React JS and Material UI. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>📝</Typography>
        <Typography variant="h5">Instructions for Candidates</Typography>
      </Box>
      
      <Typography paragraph>Please follow these instructions to complete and submit your project:</Typography>
      
      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li"><Typography>Push the entire project to a public <strong>GitHub repository</strong>.</Typography></Box>
        <Box component="li"><Typography>Make sure to <strong>commit regularly</strong> with clear messages after completing each feature.</Typography></Box>
        <Box component="li"><Typography>Use the provided EMI formula to perform calculations.</Typography></Box>
        <Box component="li"><Typography>Use <strong>Context API</strong> for global state management (e.g. theme, currency).</Typography></Box>
        <Box component="li"><Typography>Create <strong>custom React hooks</strong> for reusable logic (e.g. EMI calculation, fetching exchange rates).</Typography></Box>
        <Box component="li"><Typography>Integrate the <strong>ExchangeRate API</strong> for live currency conversion.</Typography></Box>
        <Box component="li"><Typography>Ensure the app is fully <strong>responsive</strong> on all screen sizes.</Typography></Box>
        <Box component="li"><Typography>Implement both <strong>light and dark modes</strong> using Material UI's theming system.</Typography></Box>
        <Box component="li"><Typography>Add a <strong>404 Not Found</strong> page for unmatched routes.</Typography></Box>
        <Box component="li"><Typography>Handle runtime errors gracefully by showing an <strong>Error Page</strong>.</Typography></Box>
        <Box component="li"><Typography>Once deployed, add the live deployment <strong>link in the About section</strong> of your GitHub repo.</Typography></Box>
        <Box component="li"><Typography>Deploy the project on any platform (e.g. Vercel, Netlify, GitHub Pages).</Typography></Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'success.main' }}>✅ Your final GitHub repository should include a live demo link, and your code should be readable, modular, and well-structured.</Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>🔧</Typography>
        <Typography variant="h5">Features</Typography>
      </Box>
      
      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li"><Typography>Loan EMI calculation using standard financial formulas</Typography></Box>
        <Box component="li"><Typography>Dynamic amortization schedule table with monthly breakdown</Typography></Box>
        <Box component="li"><Typography>Real-time currency conversion of EMI using a live exchange rate API</Typography></Box>
        <Box component="li"><Typography>Paginated exchange rate table for 160+ currencies</Typography></Box>
        <Box component="li"><Typography>Dark/Light mode toggle for a customizable experience</Typography></Box>
        <Box component="li"><Typography>Collapsible header navigation on mobile screens</Typography></Box>
        <Box component="li"><Typography>Fully responsive UI built with Material UI</Typography></Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>🧰</Typography>
        <Typography variant="h5">Technologies Used</Typography>
      </Box>
      
      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li"><Typography><strong>React</strong> (Hooks, Routing, Context API)</Typography></Box>
        <Box component="li"><Typography><strong>Material UI</strong> for styling and responsive components</Typography></Box>
        <Box component="li"><Typography><strong>Axios</strong> for API calls</Typography></Box>
        <Box component="li"><Typography><strong>Exchange Rate API</strong> for real-time currency conversion</Typography></Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>🧮</Typography>
        <Typography variant="h5">EMI Formula Used</Typography>
      </Box>
      
      <Typography paragraph>The EMI (Equated Monthly Installment) is calculated using the standard formula:</Typography>
      
      <Typography sx={{ fontFamily: 'monospace', my: 2, px: 2 }}>
        EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> - 1]
      </Typography>
      
      <Typography paragraph>Where:</Typography>
      
      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li"><Typography><strong>P</strong> = Principal loan amount</Typography></Box>
        <Box component="li"><Typography><strong>R</strong> = Monthly interest rate (annual rate / 12 / 100)</Typography></Box>
        <Box component="li"><Typography><strong>N</strong> = Loan duration in months</Typography></Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>🌐</Typography>
        <Typography variant="h5">Currency Conversion API</Typography>
      </Box>
      
      <Typography paragraph>This app integrates with the free tier of the <Link href="https://www.exchangerate-api.com/" target="_blank" rel="noopener">ExchangeRate-API</Link> to fetch live exchange rates.</Typography>
      
      <Typography variant="subtitle2">API Endpoint Example:</Typography>
      <Typography sx={{ fontFamily: 'monospace', my: 1, px: 2, bgcolor: 'background.paper' }}>
        https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
      </Typography>
      
      <Typography paragraph sx={{ mt: 2 }}>
        You must register and obtain a free API key to use this endpoint. Then, replace YOUR_API_KEY in the app code with your actual key.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>🎯</Typography>
        <Typography variant="h5">Purpose of This App</Typography>
      </Box>
      
      <Typography paragraph>This project is designed to assess a candidate's React development skills, including:</Typography>
      
      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li"><Typography>React fundamentals (state, props, hooks)</Typography></Box>
        <Box component="li"><Typography>Component structure and code reusability</Typography></Box>
        <Box component="li"><Typography>Third-party API integration and live data rendering</Typography></Box>
        <Box component="li"><Typography>Working with tables, lists, and pagination</Typography></Box>
        <Box component="li"><Typography>Theme customization (dark/light mode toggle)</Typography></Box>
        <Box component="li"><Typography>Error handling and graceful UI fallbacks</Typography></Box>
        <Box component="li"><Typography>Responsive design and collapsible mobile header navigation (In Mobile view)</Typography></Box>
      </Box>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1, color: 'info.contrastText' }}>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>✨</span> For any currency conversion feature to work, make sure the API key is valid and the network allows external API calls.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>🔗</Typography>
        <Typography variant="h5">Project Links</Typography>
      </Box>

      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li">
          <Typography>
            GitHub Repository: <Link href="YOUR_GITHUB_REPO_URL" target="_blank" rel="noopener">View Source Code</Link>
          </Typography>
        </Box>
        <Box component="li">
          <Typography>
            Live Demo: <Link href="YOUR_LIVE_DEMO_URL" target="_blank" rel="noopener">Try the App</Link>
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="span" sx={{ mr: 2 }}>📦</Typography>
        <Typography variant="h5">Version Information</Typography>
      </Box>

      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li"><Typography>Version: 1.0.0</Typography></Box>
        <Box component="li"><Typography>Last Updated: {new Date().toLocaleDateString()}</Typography></Box>
      </Box>
    </Container>
  );
}

export default About;