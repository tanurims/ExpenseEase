<!DOCTYPE html>

<html>
    <head>
        <title>Login and Register</title>
        <link rel="stylesheet" href="css/loginAndRegister.css">
    </head>
    <body>
        <div class="auth-container">
           <div class="brand-section">
                <div class="brand-logo">💸</div>
                <h1 class="brand-title">ExpenseEase</h1>
                <p class="brand-subtitle">Take control of your finances with our intuitive expense tracking platform. Monitor your income, track expenses, and achieve your financial goals.</p>
            </div>

            <div class="form-section">
                <div class="form-toggle">
                    <button class="toggle-btn active" onclick="showLogin()">Login</button>
                    <button class="toggle-btn" onclick="showRegister()">Register</button>
                </div>

                <div class="error-message" id="errorMessage"></div>
                <div class="success-message" id="successMessage"></div>

                <div class="form-container">

                    <form id="loginForm" class="form" action="">
                        <h2 class="form-title">Welcome Back!</h2>

                        <div class="form-group">
                            <label class="form-label">Email Address</label>
                            <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <div class="password-container">
                                <input type="password" id="password" class="form-input" placeholder="Enter your password" required>
                                <button type="button" class="password-toggle" onclick="togglePassword('password')">👁️</button>
                            </div>

                        </div>

                        <button class="submit-btn" type="submit">
                            <span class="btn-text">Login</span>
                        </button>

                    </form>

                    <form class="form hidden" id="registerForm">
                        <h2 class="form-title">Create an Account</h2>

                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" id="fullName" class="form-input" placeholder="Enter your full name" required>
                        </div>

                         <div class="form-group">
                            <label class="form-label">Email Address</label>
                            <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <div class="password-container">
                                <input type="password" id="registerPassword" class="form-input" placeholder="Create a password" required oninput="checkPasswordStrength(this.value)">
                                <button type="button" class="password-toggle" onclick="togglePassword('registerPassword')">👁️</button>
                            </div>
                            <div class="strength-meter" id="strengthMeter">
                                <div class="strength-fill" id="strengthFill"></div>
                            </div>

                        </div>

                        <div class="form-group">
                            <label class="form-label">Confirm Password</label>
                            <div class="password-container">
                                <input type="password" class="form-input" id="confirmPassword" placeholder="Confirm your password" required>
                                <button type="button" class="password-toggle" onclick="togglePassword('confirmPassword')">👁️</button>
                            </div>
                        </div>

                        <button class="submit-btn" type="submit">
                            <span class="btn-text">Create Account</span>
                        </button>
                    </form>

                </div>
            </div>
        </div>

        <script>
            function showLogin(){
                document.querySelectorAll('.toggle-btn').forEach(btn=>btn.classList.remove('active'));
                event.target.classList.add('active');

                document.getElementById('loginForm').classList.remove('hidden');
                document.getElementById('registerForm').classList.add('hidden');
                hideMessages();
            }

            function showRegister() {
                document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                
                document.getElementById('registerForm').classList.remove('hidden');
                document.getElementById('loginForm').classList.add('hidden');
                hideMessages();
           }

           function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const button = event.target;
            
            if (input.type === 'password') {
                input.type = 'text';
                button.textContent = '🙈';
            } else {
                input.type = 'password';
                button.textContent = '👁️';
            }
        }

        function checkPasswordStrength(password) {
            const meter = document.getElementById('strengthMeter');
            const fill = document.getElementById('strengthFill');
            
            if (password.length === 0) {
                meter.classList.remove('visible');
                return;
            }
            
            meter.classList.add('visible');
            
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            fill.className = 'strength-fill';
            if (strength <= 1) fill.classList.add('strength-weak');
            else if (strength <= 2) fill.classList.add('strength-medium');
            else if (strength <= 3) fill.classList.add('strength-strong');
            else fill.classList.add('strength-very-strong');
        }

        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            hideSuccess();
        }

        function showSuccess(message) {
            const successDiv = document.getElementById('successMessage');
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            hideError();
        }

        function hideError() {
            document.getElementById('errorMessage').style.display = 'none';
        }

        function hideSuccess() {
            document.getElementById('successMessage').style.display = 'none';
        }

        function hideMessages() {
            hideError();
            hideSuccess();
        }



        </script>
    </body>
</html>




