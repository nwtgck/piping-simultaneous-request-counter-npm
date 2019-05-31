# piping-simultaneous-request-counter
Simultaneous request counter of [Piping Server](https://github.com/nwtgck/piping-server) for Web Browser

## Operational test

```bash
npm install
npm run operational-test
```

Then, you can access to <http://localhost:8080/>, which will be loaded automatically if file changes detected.

### Public operational test
Here is a public site for the operational test.  
<https://piping-simultaneous-request-counter-operational.netlify.com>
The main reanson to host on [Netlify](https://www.netlify.com) is for PR deployment. Each pull request triggers hosting of static site as different subdomain sites.
