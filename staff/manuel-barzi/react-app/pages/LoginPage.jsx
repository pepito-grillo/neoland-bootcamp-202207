function LoginPage({ onLinkClick, onLogIn, onFeedback }) {
    const logger = new Loggito(LoginPage.name)

    logger.info('constructor')

    logger.info('render')

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const emailInput = form.email
        const passwordInput = form.password

        const email = emailInput.value
        const password = passwordInput.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) {
                    onFeedback({ message: error.message, level: 'error'})

                    logger.warn(error.message)

                    return
                }

                logger.debug('user logged in')

                sessionStorage.token = token

                onLogIn()
            })
        } catch (error) {
            onFeedback({ message: error.message, level: 'error'})

            logger.warn(error.message)
        }
    }

    return <main className="login-page container container--full container--spaced">
        <form className="form" action="https://www.google.com/search" method="get" onSubmit={handleFormSubmit}>
            <div className="form__field">
                <label htmlFor="email">E-mail</label>
                <input className="input" type="email" name="email" placeholder="email" id="email" />
            </div>

            <div className="form__field">
                <label htmlFor="password">Password</label>
                <input className="input" type="password" name="password" placeholder="password" id="password" />
            </div>

            <button className="button" type="submit">Login</button>
        </form>

        <a className="anchor" href="register.html" onClick={handleLinkClick}>Register</a>
    </main>
}