    document.addEventListener("DOMContentLoaded", function () {
            const btnNew = document.getElementById("btnNew");
            const btnFolder = document.getElementById("btnFolder");

            btnNew.addEventListener("click", function () {
                btnNew.classList.add("active");
                btnFolder.classList.remove("active");
            });

            btnFolder.addEventListener("click", function () {
                btnFolder.classList.add("active");
                btnNew.classList.remove("active");
            });
        });
        // Task Dashboard Functionality
        document.addEventListener('DOMContentLoaded', function () {
            // Hide modals by default on page load
            const createTaskModal = document.getElementById('createTaskModal');
            const editModal = document.getElementById('editModal');
            const classDetailsModal = document.getElementById('classDetailsModal');
        
            if (createTaskModal) {
                createTaskModal.style.display = 'none';
            }
        
            if (editModal) {
                editModal.style.display = 'none';
            }

            if (classDetailsModal) {
                classDetailsModal.style.display = 'none';
            }
        });
        
        // Navigation functionality
        const navItems = document.querySelectorAll('.nav-item');
        const pages = document.querySelectorAll('.page');
        
        // Map navigation items to their corresponding pages
        const pageMapping = {
            'home-nav': 'home-page',
            'files-nav': 'folders-page',
            'analytics-nav': 'analytics-page',
            'calendar-nav': 'schedule-page',
            'timer-nav': 'timer-page',
            'settings-nav': 'settings-page'
        };
        
        // Add click functionality to navigation items
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Get the id of the clicked nav item
                const navId = this.id;
                const targetPageId = pageMapping[navId];
                
                // Hide all pages
                pages.forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show the target page
                document.getElementById(targetPageId).classList.add('active');
                
                // Update active navigation
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
//-------------------------- JS for Analytics Page---------------------------------------- //
         // Finance tabs functionality
         const financeTabs = document.querySelectorAll('.finance-tab');
         const tabContents = document.querySelectorAll('.tab-content');

         financeTabs.forEach(tab => {
             tab.addEventListener('click', function () {
                 // Remove active class from all tabs
                 financeTabs.forEach(t => t.classList.remove('active'));
                 // Add active class to clicked tab
                 this.classList.add('active');

                 // Hide all tab contents
                 tabContents.forEach(content => content.classList.remove('active'));

                 // Show corresponding tab content
                 const tabId = this.getAttribute('data-tab') + '-tab';
                 document.getElementById(tabId).classList.add('active');
             });
         });

         // Goal details view functionality
         document.addEventListener('DOMContentLoaded', function () {
             // Fix goal click functionality to reveal progress
             const goalEntries = document.querySelectorAll('.finance-entry');
             const goalDetails = document.getElementById('goal-details');
             let activeGoalEntry = null;

             goalEntries.forEach((entry) => {
                 // Only apply to entries in the goals tab that aren't the "Add Goal" entry
                 if (!entry.querySelector('.entry-icon') || !entry.querySelector('.entry-icon').textContent.includes('➕')) {
                     entry.addEventListener('click', function () {
                         if (goalDetails.style.display === 'none' || goalDetails.style.display === '') {
                             goalDetails.style.display = 'block';
                             activeGoalEntry = entry;
                         } else {
                             goalDetails.style.display = 'none';
                             activeGoalEntry = null;
                         }
                     });
                 }
             });

             // Fix pencil button functionality in goal tab
             const goalEditButtons = document.querySelectorAll('#goals-tab .edit-entry');

             goalEditButtons.forEach(button => {
                 button.addEventListener('click', function (e) {
                     // Prevent the click from bubbling up to the parent entry
                     e.stopPropagation();


                     // Reference to the active goal for updating
                     const goalEntry = this.closest('.finance-entry');

                     // Override the equals button to update the goal amount
                     const equalsButton = document.querySelector('.calc-button-operator[innerText="="]');
                     const originalEqualsFunction = equalsButton.onclick;

                     equalsButton.addEventListener('click', function () {
                         // Get the calculated amount
                         const amount = calcDisplay.innerText;

                         // Update the goal entry if this is a goal edit
                         if (goalDetails.style.display === 'block') {
                             // Add a new record to the goals list
                             const goalsList = document.querySelector('.goals-list');
                             const newRecord = document.createElement('div');
                             newRecord.className = 'goal-record';
                             newRecord.innerHTML = `
                                                         <div class="goal-amount">₱${amount}</div>
                                                         <div class="goal-status">Added to your goal!</div>
                                                     `;
                             goalsList.prepend(newRecord);

                             // Update the progress bar
                             const progressBar = goalEntry.querySelector('.progress-bar');
                             const currentWidth = parseFloat(progressBar.style.width) || 0;
                             const newWidth = Math.min(currentWidth + 5, 100); // Increase by 5% for demo
                             progressBar.style.width = newWidth + '%';

                             // Update the percentage text
                             const percentText = goalEntry.querySelector('div[style*="text-align: right"]');
                             if (percentText) {
                                 percentText.textContent = newWidth.toFixed(1) + '%';
                             }

                             // Update total saved
                             const totalSaved = document.querySelector('.total-saved');
                             if (totalSaved) {
                                 const currentTotal = totalSaved.textContent.match(/₱([\d,]+)/);
                                 if (currentTotal) {
                                     const newTotal = parseInt(currentTotal[1].replace(',', '')) + parseInt(amount);
                                     totalSaved.textContent = `Total Saved: ₱${newTotal.toLocaleString()}`;
                                 }
                             }
                         }

                         // Hide calculator after use
                         calculator.style.display = 'none';
                     }, { once: true }); // Use once:true to ensure this only happens once
                 });
             });
         });

         // Progress bars animation
         const progressBars = document.querySelectorAll('.progress-bar');
         progressBars.forEach(bar => {
             const width = bar.style.width;
             bar.style.width = '0';
             setTimeout(() => {
                 bar.style.transition = 'width 1s ease-in-out';
                 bar.style.width = width;
             }, 500);
         });

         // Calculator functionality
         let calcDisplay = document.querySelector('.calculator-display');
         let calcButtons = document.querySelectorAll('.calc-button');
         let calculation = '';

         calcButtons.forEach(button => {
             button.addEventListener('click', function () {
                 let value = this.innerText;

                 if (value === 'C') {
                     calculation = '';
                     calcDisplay.innerText = '0';
                 } else if (value === '=') {
                     try {
                         calculation = eval(calculation.replace('×', '*').replace('÷', '/')).toString();
                         calcDisplay.innerText = calculation;
                     } catch (e) {
                         calcDisplay.innerText = 'Error';
                         calculation = '';
                     }
                 } else if (value === 'DELETE') {
                     calculation = calculation.slice(0, -1);
                     calcDisplay.innerText = calculation || '0';
                 } else {
                     calculation += value;
                     calcDisplay.innerText = calculation;
                 }
             });
         });

         // Show calculator when needed
         const financeEntries = document.querySelectorAll('.finance-entry');
         const calculator = document.querySelector('.calculator');

         financeEntries.forEach(entry => {
             entry.addEventListener('dblclick', function () {
                 calculator.style.display = calculator.style.display === 'block' ? 'none' : 'block';
             });
         });

         // Initialize finance summary with animation
         function updateFinanceSummary() {
             const incomeTotal = document.getElementById('income-total');
             const expenseTotal = document.getElementById('expense-total');
             const balanceTotal = document.getElementById('balance-total');

             let income = 0;
             let expense = 0;

             // Count up animation
             let incomeCounter = 0;
             let expenseCounter = 0;
             let balanceCounter = 0;

             const incomeInterval = setInterval(() => {
                 if (incomeCounter >= "") {
                     clearInterval(incomeInterval);
                 } else {
                     incomeCounter += 5;
                     incomeTotal.innerText = incomeCounter;
                 }
             }, 20);

             const expenseInterval = setInterval(() => {
                 if (expenseCounter <= "") {
                     clearInterval(expenseInterval);
                 } else {
                     expenseCounter -= 1;
                     expenseTotal.innerText = expenseCounter;
                 }
             }, 20);

             const balanceInterval = setInterval(() => {
                 if (balanceCounter >= "") {
                     clearInterval(balanceInterval);
                 } else {
                     balanceCounter += 4;
                     balanceTotal.innerText = balanceCounter;
                 }
             }, 20);
         }

         // Run animation when analytics tab is shown
         document.getElementById('analytics-nav').addEventListener('click', updateFinanceSummary);

         // Initial animation
         updateFinanceSummary();

         // Enhanced income tab functionality
         document.addEventListener('DOMContentLoaded', function () {
             // Initialize finance values
             let incomeTotal = 0;
             let expenseTotal = 0;

             // Get references to key elements
             const incomeEntries = document.querySelectorAll('#income-tab .finance-entry');
             const calculator = document.querySelector('.calculator');
             const incomeTotalElement = document.getElementById('income-total');
             const expenseTotalElement = document.getElementById('expense-total');
             const balanceTotalElement = document.getElementById('balance-total');

             // Add some styling
             const style = document.createElement('style');
             style.textContent = `
                         .modal-overlay {
                             position: fixed;
                             top: 0;
                             left: 0;
                             right: 0;
                             bottom: 0;
                             background-color: rgba(0, 0, 0, 0.5);
                             display: flex;
                             justify-content: center;
                             align-items: center;
                             z-index: 1000;
                         }
                         .income-modal {
                             background-color: white;
                             padding: 20px;
                             border-radius: 10px;
                             width: 80%;
                             max-width: 350px;
                         }
                         .modal-header {
                             display: flex;
                             justify-content: space-between;
                             align-items: center;
                             margin-bottom: 15px;
                         }
                         .modal-header h3 {
                             margin: 0;
                         }
                         .close-modal {
                             background: none;
                             border: none;
                             font-size: 20px;
                             cursor: pointer;
                         }
                         .modal-input {
                             width: 100%;
                             padding: 10px;
                             margin-bottom: 10px;
                             border: 1px solid #ddd;
                             border-radius: 5px;
                         }
                         .modal-footer {
                             display: flex;
                             justify-content: flex-end;
                         }
                         .save-btn {
                             background-color: #4CAF50;
                             color: white;
                             border: none;
                             padding: 8px 15px;
                             border-radius: 5px;
                             cursor: pointer;
                         }
                         .transaction-item {
                             display: flex;
                             justify-content: space-between;
                             align-items: center;
                             padding: 10px;
                             border-bottom: 1px solid #f0f0f0;
                         }
                         .transaction-details {
                             display: flex;
                             align-items: center;
                             gap: 10px;
                         }
                         .transaction-icon {
                             font-size: 24px;
                         }
                         .transaction-category {
                             font-weight: bold;
                         }
                         .transaction-description {
                             font-size: 12px;
                             color: #666;
                         }
                         .transaction-time {
                             font-size: 10px;
                             color: #999;
                         }
                         .transaction-amount {
                             font-weight: bold;
                         }
                         .income-amount {
                             color: #4CAF50;
                         }
                         .expense-amount {
                             color: #f44336;
                         }
                     `;
             document.head.appendChild(style);

             // Add click event to all edit buttons in income tab
             const editButtons = document.querySelectorAll('#income-tab .edit-entry');
             editButtons.forEach(button => {
                 button.addEventListener('click', function (e) {
                     e.stopPropagation(); // Prevent event bubbling

                     const entry = this.closest('.finance-entry');
                     const categoryName = entry.querySelector('.entry-name').textContent;
                     const categoryIcon = entry.querySelector('.entry-icon').textContent;

                     // Create modal for input
                     createIncomeModal(categoryName, categoryIcon);
                 });
             });

             // Make entire entry row clickable too
             incomeEntries.forEach(entry => {
                 entry.addEventListener('click', function () {
                     // Don't activate for the "Others" / add new category option
                     if (this.querySelector('.entry-icon').textContent !== '➕') {
                         const categoryName = this.querySelector('.entry-name').textContent;
                         const categoryIcon = this.querySelector('.entry-icon').textContent;
                         createIncomeModal(categoryName, categoryIcon);
                     } else {
                         // For the "Others" entry, show a modal to add a new income category
                         createNewCategoryModal();
                     }
                 });
             });

             function createIncomeModal(category, icon) {
                 // Create modal overlay
                 const modalOverlay = document.createElement('div');
                 modalOverlay.className = 'modal-overlay';

                 // Create modal content
                 const modal = document.createElement('div');
                 modal.className = 'income-modal';
                 modal.innerHTML = `
                             <div class="modal-header">
                                 <h3>${icon} ${category} Income</h3>
                                 <button class="close-modal">×</button>
                             </div>
                             <div class="modal-body">
                                 <input type="number" class="modal-input" placeholder="Enter amount" min="0">
                                 <input type="text" class="modal-input" placeholder="Description (optional)">
                             </div>
                             <div class="modal-footer">
                                 <button class="save-btn">Save</button>
                             </div>
                         `;

                 modalOverlay.appendChild(modal);
                 document.body.appendChild(modalOverlay);

                 // Focus the input
                 setTimeout(() => {
                     modal.querySelector('.modal-input').focus();
                 }, 100);

                 // Close modal when clicking close button
                 modal.querySelector('.close-modal').addEventListener('click', () => {
                     document.body.removeChild(modalOverlay);
                 });

                 // Close modal when clicking outside
                 modalOverlay.addEventListener('click', (e) => {
                     if (e.target === modalOverlay) {
                         document.body.removeChild(modalOverlay);
                     }
                 });

                 // Save button functionality - FIXED
                 modal.querySelector('.save-btn').addEventListener('click', () => {
                     const amountInput = modal.querySelector('.modal-input');
                     const descriptionInput = modal.querySelectorAll('.modal-input')[1];
                     const amount = parseFloat(amountInput.value);
                     const description = descriptionInput.value;

                     if (!isNaN(amount) && amount > 0) {
                         // Find the matching entry by looping through entries instead of using complex selector
                         const entries = document.querySelectorAll('#income-tab .finance-entry');
                         for (let i = 0; i < entries.length; i++) {
                             const entry = entries[i];
                             const entryName = entry.querySelector('.entry-name');
                             if (entryName && entryName.textContent.trim() === category.trim()) {
                                 const amountElement = entry.querySelector('.entry-amount');
                                 // If there's already a value, add to it
                                 const currentAmount = amountElement.textContent === '-' ? 0 :
                                     parseFloat(amountElement.textContent.replace(/[^0-9.-]+/g, ''));
                                 const newAmount = currentAmount + amount;
                                 amountElement.textContent = '₱' + newAmount.toLocaleString();
                                 break;
                             }
                         }

                         // Update the total income in the summary
                         incomeTotal += amount;
                         incomeTotalElement.textContent = '₱' + incomeTotal.toLocaleString();

                         // Update balance
                         const balance = incomeTotal - expenseTotal;
                         balanceTotalElement.textContent = '₱' + balance.toLocaleString();

                         // Add to transactions
                         addTransaction('income', category, icon, amount, description);

                         // Close the modal
                         document.body.removeChild(modalOverlay);
                     } else {
                         amountInput.style.borderColor = 'red';
                         amountInput.focus();
                     }
                 });

                 // Allow Enter key to submit
                 modal.querySelectorAll('.modal-input').forEach(input => {
                     input.addEventListener('keypress', (e) => {
                         if (e.key === 'Enter') {
                             modal.querySelector('.save-btn').click();
                         }
                     });
                 });
             }

             function createNewCategoryModal() {
                 // Create modal overlay
                 const modalOverlay = document.createElement('div');
                 modalOverlay.className = 'modal-overlay';

                 // Create modal content
                 const modal = document.createElement('div');
                 modal.className = 'income-modal';
                 modal.innerHTML = `
                             <div class="modal-header">
                                 <h3>Add New Income Category</h3>
                                 <button class="close-modal">×</button>
                             </div>
                             <div class="modal-body">
                                 <input type="text" class="modal-input" placeholder="Category Name">
                                 <input type="text" class="modal-input" placeholder="Emoji Icon (optional)">
                                 <input type="number" class="modal-input" placeholder="Initial Amount (optional)" min="0">
                             </div>
                             <div class="modal-footer">
                                 <button class="save-btn">Add Category</button>
                             </div>
                         `;

                 modalOverlay.appendChild(modal);
                 document.body.appendChild(modalOverlay);

                 // Focus the input
                 setTimeout(() => {
                     modal.querySelector('.modal-input').focus();
                 }, 100);

                 // Close modal functionality
                 modal.querySelector('.close-modal').addEventListener('click', () => {
                     document.body.removeChild(modalOverlay);
                 });

                 modalOverlay.addEventListener('click', (e) => {
                     if (e.target === modalOverlay) {
                         document.body.removeChild(modalOverlay);
                     }
                 });

                 // Save button functionality
                 modal.querySelector('.save-btn').addEventListener('click', () => {
                     const nameInput = modal.querySelector('.modal-input');
                     const iconInput = modal.querySelectorAll('.modal-input')[1];
                     const amountInput = modal.querySelectorAll('.modal-input')[2];

                     const categoryName = nameInput.value.trim();
                     const icon = iconInput.value.trim() || '💰';
                     const amount = parseFloat(amountInput.value) || 0;

                     if (categoryName) {
                         // Add new category to the income list
                         addNewIncomeCategory(categoryName, icon, amount);

                         // Close the modal
                         document.body.removeChild(modalOverlay);
                     } else {
                         nameInput.style.borderColor = 'red';
                         nameInput.focus();
                     }
                 });
             }

             function addNewIncomeCategory(name, icon, initialAmount) {
                 const incomeList = document.querySelector('.income-list');
                 const addEntry = incomeList.lastElementChild; // Get the "Add" entry (➕)

                 // Create new entry element
                 const newEntry = document.createElement('div');
                 newEntry.className = 'finance-entry';
                 newEntry.innerHTML = `
                             <div class="entry-icon">${icon}</div>
                             <div class="entry-details">
                                 <div class="entry-name">${name}</div>
                             </div>
                             <div class="entry-amount">${initialAmount > 0 ? '₱' + initialAmount.toLocaleString() : '-'}</div>
                             <div class="edit-entry">✏️</div>
                         `;

                 incomeList.insertBefore(newEntry, addEntry);

                 // Add click event to the new entry
                 newEntry.addEventListener('click', function () {
                     const categoryName = this.querySelector('.entry-name').textContent;
                     const categoryIcon = this.querySelector('.entry-icon').textContent;
                     createIncomeModal(categoryName, categoryIcon);
                 });

                 // Add click event to the edit button
                 const editButton = newEntry.querySelector('.edit-entry');
                 editButton.addEventListener('click', function (e) {
                     e.stopPropagation();
                     const categoryName = this.closest('.finance-entry').querySelector('.entry-name').textContent;
                     const categoryIcon = this.closest('.finance-entry').querySelector('.entry-icon').textContent;
                     createIncomeModal(categoryName, categoryIcon);
                 });

                 // If there's an initial amount, update totals
                 if (initialAmount > 0) {
                     incomeTotal += initialAmount;
                     incomeTotalElement.textContent = '₱' + incomeTotal.toLocaleString();

                     // Update balance
                     const balance = incomeTotal - expenseTotal;
                     balanceTotalElement.textContent = '₱' + balance.toLocaleString();

                     // Add to transactions
                     addTransaction('income', name, icon, initialAmount, 'Initial amount');
                 }
             }

             // Function to add a transaction to the recent transactions list
             function addTransaction(type, category, icon, amount, description = '') {
                 const transactionsList = document.getElementById('transactions-list');
                 if (!transactionsList) return;

                 // Remove the "No transactions yet" message if it exists
                 const emptyMessage = transactionsList.querySelector('.empty-transactions');
                 if (emptyMessage) {
                     emptyMessage.remove();
                 }

                 // Create transaction element
                 const transaction = document.createElement('div');
                 transaction.className = 'transaction-item';

                 const currentTime = new Date().toLocaleTimeString('en-US', {
                     hour: 'numeric',
                     minute: '2-digit',
                     hour12: true
                 });

                 transaction.innerHTML = `
                 <div class="transaction-details">
                     <div class="transaction-icon">${icon}</div>
                     <div>
                         <div class="transaction-category">${category}</div>
                         ${description ? `<div class="transaction-description">${description}</div>` : ''}
                         <div class="transaction-time">${currentTime}</div>
                     </div>
                 </div>
                 <div class="transaction-amount ${type === 'income' ? 'income-amount' : 'expense-amount'}">
                     ${type === 'income' ? '+' : '-'}₱${amount.toLocaleString()}
                 </div>
             `;

                 // Insert at the beginning of the list
                 transactionsList.insertBefore(transaction, transactionsList.firstChild);
             }

             // Clear all transactions button
             const clearTransactionsBtn = document.getElementById('clear-transactions');
             if (clearTransactionsBtn) {
                 clearTransactionsBtn.addEventListener('click', function () {
                     const transactionsList = document.getElementById('transactions-list');
                     if (transactionsList) {
                         // Confirm before clearing
                         if (confirm('Are you sure you want to clear all transactions?')) {
                             transactionsList.innerHTML = '<div class="empty-transactions">No transactions yet</div>';
                         }
                     }
                 });
             }

             // Add similar functionality for Expense tab
             const expenseEntries = document.querySelectorAll('#expense-tab .finance-entry');
             const expenseEditButtons = document.querySelectorAll('#expense-tab .edit-entry');

             expenseEditButtons.forEach(button => {
                 button.addEventListener('click', function (e) {
                     e.stopPropagation();
                     const entry = this.closest('.finance-entry');
                     const categoryName = entry.querySelector('.entry-name').textContent;
                     const categoryIcon = entry.querySelector('.entry-icon').textContent;
                     createExpenseModal(categoryName, categoryIcon);
                 });
             });

             expenseEntries.forEach(entry => {
                 entry.addEventListener('click', function () {
                     if (this.querySelector('.entry-icon').textContent !== '➕') {
                         const categoryName = this.querySelector('.entry-name').textContent;
                         const categoryIcon = this.querySelector('.entry-icon').textContent;
                         createExpenseModal(categoryName, categoryIcon);
                     } else {
                         createNewExpenseCategoryModal();
                     }
                 });
             });

             function createExpenseModal(category, icon) {
                 const modalOverlay = document.createElement('div');
                 modalOverlay.className = 'modal-overlay';

                 const modal = document.createElement('div');
                 modal.className = 'income-modal'; // Reusing the same modal styles
                 modal.innerHTML = `
                 <div class="modal-header">
                     <h3>${icon} ${category} Expense</h3>
                     <button class="close-modal">×</button>
                 </div>
                 <div class="modal-body">
                     <input type="number" class="modal-input" placeholder="Enter amount" min="0">
                     <input type="text" class="modal-input" placeholder="Description (optional)">
                 </div>
                 <div class="modal-footer">
                     <button class="save-btn">Save</button>
                 </div>
             `;

                 modalOverlay.appendChild(modal);
                 document.body.appendChild(modalOverlay);

                 // Focus the input
                 setTimeout(() => {
                     modal.querySelector('.modal-input').focus();
                 }, 100);

                 // Close modal functionality
                 modal.querySelector('.close-modal').addEventListener('click', () => {
                     document.body.removeChild(modalOverlay);
                 });

                 modalOverlay.addEventListener('click', (e) => {
                     if (e.target === modalOverlay) {
                         document.body.removeChild(modalOverlay);
                     }
                 });

                 // Save button functionality
                 modal.querySelector('.save-btn').addEventListener('click', () => {
                     const amountInput = modal.querySelector('.modal-input');
                     const descriptionInput = modal.querySelectorAll('.modal-input')[1];
                     const amount = parseFloat(amountInput.value);
                     const description = descriptionInput.value;

                     if (!isNaN(amount) && amount > 0) {
                         // Find the matching entry and update its amount
                         const entries = document.querySelectorAll('#expense-tab .finance-entry');
                         for (let i = 0; i < entries.length; i++) {
                             const entry = entries[i];
                             const entryName = entry.querySelector('.entry-name');
                             if (entryName && entryName.textContent.trim() === category.trim()) {
                                 const amountElement = entry.querySelector('.entry-amount');
                                 const currentAmount = amountElement.textContent === '-' ? 0 :
                                     parseFloat(amountElement.textContent.replace(/[^0-9.-]+/g, ''));
                                 const newAmount = currentAmount + amount;
                                 amountElement.textContent = '₱' + newAmount.toLocaleString();
                                 break;
                             }
                         }

                         // Update the total expense in the summary
                         expenseTotal += amount;
                         expenseTotalElement.textContent = '₱' + expenseTotal.toLocaleString();

                         // Update balance
                         const balance = incomeTotal - expenseTotal;
                         balanceTotalElement.textContent = '₱' + balance.toLocaleString();

                         // Add to transactions
                         addTransaction('expense', category, icon, amount, description);

                         // Close the modal
                         document.body.removeChild(modalOverlay);
                     } else {
                         amountInput.style.borderColor = 'red';
                         amountInput.focus();
                     }
                 });

                 // Allow Enter key to submit
                 modal.querySelectorAll('.modal-input').forEach(input => {
                     input.addEventListener('keypress', (e) => {
                         if (e.key === 'Enter') {
                             modal.querySelector('.save-btn').click();
                         }
                     });
                 });
             }

             function createNewExpenseCategoryModal() {
                 const modalOverlay = document.createElement('div');
                 modalOverlay.className = 'modal-overlay';

                 const modal = document.createElement('div');
                 modal.className = 'income-modal';
                 modal.innerHTML = `
                 <div class="modal-header">
                     <h3>Add New Expense Category</h3>
                     <button class="close-modal">×</button>
                 </div>
                 <div class="modal-body">
                     <input type="text" class="modal-input" placeholder="Category Name">
                     <input type="text" class="modal-input" placeholder="Emoji Icon (optional)">
                     <input type="number" class="modal-input" placeholder="Initial Amount (optional)" min="0">
                 </div>
                 <div class="modal-footer">
                     <button class="save-btn">Add Category</button>
                 </div>
             `;

                 modalOverlay.appendChild(modal);
                 document.body.appendChild(modalOverlay);

                 // Focus the input
                 setTimeout(() => {
                     modal.querySelector('.modal-input').focus();
                 }, 100);

                 // Close modal functionality
                 modal.querySelector('.close-modal').addEventListener('click', () => {
                     document.body.removeChild(modalOverlay);
                 });

                 modalOverlay.addEventListener('click', (e) => {
                     if (e.target === modalOverlay) {
                         document.body.removeChild(modalOverlay);
                     }
                 });

                 // Save button functionality
                 modal.querySelector('.save-btn').addEventListener('click', () => {
                     const nameInput = modal.querySelector('.modal-input');
                     const iconInput = modal.querySelectorAll('.modal-input')[1];
                     const amountInput = modal.querySelectorAll('.modal-input')[2];

                     const categoryName = nameInput.value.trim();
                     const icon = iconInput.value.trim() || '💸';
                     const amount = parseFloat(amountInput.value) || 0;

                     if (categoryName) {
                         addNewExpenseCategory(categoryName, icon, amount);
                         document.body.removeChild(modalOverlay);
                     } else {
                         nameInput.style.borderColor = 'red';
                         nameInput.focus();
                     }
                 });
             }

             function addNewExpenseCategory(name, icon, initialAmount) {
                 const expenseList = document.querySelector('.expense-list');
                 const addEntry = expenseList.lastElementChild; // Get the "Add" entry (➕)

                 const newEntry = document.createElement('div');
                 newEntry.className = 'finance-entry';
                 newEntry.innerHTML = `
                 <div class="entry-icon">${icon}</div>
                 <div class="entry-details">
                     <div class="entry-name">${name}</div>
                 </div>
                 <div class="entry-amount">${initialAmount > 0 ? '₱' + initialAmount.toLocaleString() : '-'}</div>
                 <div class="edit-entry">✏️</div>
             `;

                 expenseList.insertBefore(newEntry, addEntry);

                 // Add click event to the new entry
                 newEntry.addEventListener('click', function () {
                     const categoryName = this.querySelector('.entry-name').textContent;
                     const categoryIcon = this.querySelector('.entry-icon').textContent;
                     createExpenseModal(categoryName, categoryIcon);
                 });

                 // Add click event to the edit button
                 const editButton = newEntry.querySelector('.edit-entry');
                 editButton.addEventListener('click', function (e) {
                     e.stopPropagation();
                     const categoryName = this.closest('.finance-entry').querySelector('.entry-name').textContent;
                     const categoryIcon = this.closest('.finance-entry').querySelector('.entry-icon').textContent;
                     createExpenseModal(categoryName, categoryIcon);
                 });

                 // If there's an initial amount, update totals
                 if (initialAmount > 0) {
                     expenseTotal += initialAmount;
                     expenseTotalElement.textContent = '₱' + expenseTotal.toLocaleString();

                     // Update balance
                     const balance = incomeTotal - expenseTotal;
                     balanceTotalElement.textContent = '₱' + balance.toLocaleString();

                     // Add to transactions
                     addTransaction('expense', name, icon, initialAmount, 'Initial amount');
                 }
             }
         });
// ------------------------------JS for Schedule Page----------------------------------------//
// Set current date and mark current day
function markCurrentDayColumn() {
    // Get the current date
    const now = new Date();

    // Get the day of week as a number (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = now.getDay();

    // Map JavaScript's day numbers directly to the HTML element IDs
    const dayMapping = {
        0: 'sunday-schedule',    // Sunday
        1: 'monday-schedule',    // Monday
        2: 'tuesday-schedule',   // Tuesday
        3: 'wednesday-schedule', // Wednesday
        4: 'thursday-schedule',  // Thursday
        5: 'friday-schedule',    // Friday
        6: 'saturday-schedule'   // Saturday
    };

    // Get the current day's column ID
    const currentDayId = dayMapping[dayOfWeek];

    // Remove highlight and positioning from all day labels first
    document.querySelectorAll('.column .day-label').forEach(label => {
        label.style.background = '';
        label.style.color = '';
        label.style.fontWeight = '';
        label.style.boxShadow = '';
        label.style.transform = '';
        label.style.border = '';
        label.style.transition = '';
        label.style.position = '';
        label.style.top = '';
        label.style.animation = '';
        label.style.borderRadius = '';
        label.style.padding = '';
    });

    // Add highlight to the current day's label
    const currentColumn = document.getElementById(currentDayId);
    if (currentColumn) {
        const dayLabel = currentColumn.querySelector('.day-label');
        if (dayLabel) {
            // Apply gorgeous styles with gradient and animations - with oval shape
            dayLabel.style.background = 'linear-gradient(135deg, #FF9AAE 0%, #FF87B7 50%, #FFC8DD 100%)';
            dayLabel.style.color = 'white';
            dayLabel.style.fontWeight = 'bold';
            dayLabel.style.boxShadow = '0 4px 15px rgba(255, 135, 183, 0.6)';

            // Make it oval shaped by adding border-radius
            dayLabel.style.borderRadius = '50px'; // Large value creates oval shape
            dayLabel.style.padding = '2px 12px'; // Add horizontal padding to make it more oval

            // Position the element slightly upward
            dayLabel.style.position = 'relative';
            dayLabel.style.top = '-6px';  // Move upward by 6 pixels
            dayLabel.style.transform = 'scale(1.12)';

            dayLabel.style.border = '2px solid rgba(255, 255, 255, 0.7)';
            dayLabel.style.transition = 'all 0.3s ease-in-out';

            // Add a subtle pulse animation
            setTimeout(() => {
                dayLabel.style.animation = 'pulse 2s infinite';

                // Create the keyframe animation if it doesn't exist
                if (!document.getElementById('pulseAnimation')) {
                    const style = document.createElement('style');
                    style.id = 'pulseAnimation';
                    style.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1.12); top: -6px; }
            50% { transform: scale(1.17); top: -8px; }
            100% { transform: scale(1.12); top: -6px; }
        }
    `;
                    document.head.appendChild(style);
                }
            }, 100);

            console.log(`Applied oval highlight to: ${currentDayId}`);
        } else {
            console.error(`Day label not found in column: ${currentDayId}`);
        }
    } else {
        console.error(`Current day column not found: ${currentDayId}`);
    }
}
    function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = formattedDate;

    // Call the markCurrentDayColumn function directly
    markCurrentDayColumn();
}

// Make sure this runs when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setCurrentDate();

    // For debugging - log all column IDs to make sure they exist
    document.querySelectorAll('.column').forEach(column => {
        console.log(`Found column with ID: ${column.id}`);
    });
});

// Make class items clickable
const classItems = document.querySelectorAll('.class-item');
classItems.forEach(item => {
    item.addEventListener('click', function () {
        const className = this.querySelector('.class-name').textContent;
        const classTime = this.querySelectorAll('.class-time')[0].textContent + ' - ' +
            this.querySelectorAll('.class-time')[1].textContent;

        // Show in modal instead of alert
        document.getElementById('modalClassName').textContent = className;
        document.getElementById('modalClassTime').textContent = classTime;

        // Handle optional fields
        if (this.dataset.instructor) {
            document.getElementById('modalInstructor').textContent = this.dataset.instructor;
            document.getElementById('modalInstructorRow').style.display = 'block';
        } else {
            document.getElementById('modalInstructorRow').style.display = 'none';
        }

        if (this.dataset.location) {
            document.getElementById('modalLocation').textContent = this.dataset.location;
            document.getElementById('modalLocationRow').style.display = 'block';
        } else {
            document.getElementById('modalLocationRow').style.display = 'none';
        }

        // Show the modal
        document.getElementById('classDetailsModal').style.display = 'flex';
    });
});

// Make add button show new schedule page
const addButton = document.querySelector('#add-class-button');
addButton.addEventListener('click', function () {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show new schedule page
    document.getElementById('new-schedule-page').classList.add('active');
});

// Make back button functional
const backButton = document.querySelector('#back-to-schedule');
backButton.addEventListener('click', function () {
    // Hide new schedule page
    document.getElementById('new-schedule-page').classList.remove('active');

    // Show schedule page
    document.getElementById('schedule-page').classList.add('active');
});

// Modal functionality
const editButton = document.querySelector('.edit-button');
const modal = document.getElementById('editModal');
const closeButton = document.querySelector('.modal-close');
const programForm = document.getElementById('programForm');

// Open modal when edit button is clicked
editButton.addEventListener('click', function () {
    modal.style.display = 'flex';
});

// Close modal when close button is clicked
closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Also close modal when clicking outside of it
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
programForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const programName = document.getElementById('programName').value;
    const academicYear = document.getElementById('academicYear').value;
    const semester = document.getElementById('semester').value;
    const yearLevel = document.getElementById('yearLevel').value;

    // Update program info
    document.querySelector('.program-title').textContent = programName + ' • ' + yearLevel;
    document.querySelector('.program-subtitle').textContent = academicYear + ' • ' + semester;

    // Close modal
    modal.style.display = 'none';
});

// Make day options in new schedule page selectable
const dayOptions = document.querySelectorAll('.day-option');
dayOptions.forEach(option => {
    option.addEventListener('click', function () {
        this.classList.toggle('selected');
    });
});

// Make color options in new schedule page selectable
const colorOptions = document.querySelectorAll('.color-option');
let selectedColors = '#f9d5ca'; // Default color

colorOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Remove border from all options
        colorOptions.forEach(o => {
            o.style.boxShadow = 'none';
        });

        // Add border to selected option
        this.style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px #000';

        // Update selected color
        selectedColors = this.style.backgroundColor;
    });
});

// Create Class Button functionality
const createButton = document.getElementById('create-class-button');
createButton.addEventListener('click', function () {
    // Get form values
    const className = document.getElementById('className').value;
    const instructor = document.getElementById('classCode').value;
    const location = document.getElementById('classLocation').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    // Validate that we have at least a class name and time
    if (!className || !startTime || !endTime) {
        alert('Please enter at least a class name and time');
        return;
    }

    // Format times for display
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    // Get selected days
    const selectedDays = [];
    document.querySelectorAll('.day-option.selected').forEach(day => {
        selectedDays.push(day.getAttribute('data-day'));
    });

    // Ensure at least one day is selected
    if (selectedDays.length === 0) {
        alert('Please select at least one day');
        return;
    }

    // Create class items for each selected day
    selectedDays.forEach(day => {
        const columnId = day.toLowerCase() + '-schedule';
        const dayColumn = document.getElementById(columnId);

        if (!dayColumn) {
            console.error(`Day column not found for ID: ${columnId}`);
            return; // Skip if column doesn't exist
        }

        // Create new class item
        const newClassItem = document.createElement('div');
        newClassItem.className = 'class-item';

        // Apply the selected color
        if (selectedColor) {
            newClassItem.style.backgroundColor = selectedColor;
        }

        // Store additional data as dataset attributes
        if (instructor) {
            newClassItem.dataset.instructor = instructor;
        }

        if (location) {
            newClassItem.dataset.location = location;
        }

        // Create the HTML structure
        newClassItem.innerHTML = `
        <div class="class-time">${formattedStartTime}</div>
        <div class="class-name">${className}</div>
        <div class="class-time">${formattedEndTime}</div>
    `;

        // Add click event to show details in modal
        newClassItem.addEventListener('click', function () {
            // Show in modal instead of alert
            document.getElementById('modalClassName').textContent = className;
            document.getElementById('modalClassTime').textContent = `${formattedStartTime} - ${formattedEndTime}`;

            // Handle optional fields
            if (instructor) {
                document.getElementById('modalInstructor').textContent = instructor;
                document.getElementById('modalInstructorRow').style.display = 'block';
            } else {
                document.getElementById('modalInstructorRow').style.display = 'none';
            }

            if (location) {
                document.getElementById('modalLocation').textContent = location;
                document.getElementById('modalLocationRow').style.display = 'block';
            } else {
                document.getElementById('modalLocationRow').style.display = 'none';
            }

            // Show the modal
            document.getElementById('classDetailsModal').style.display = 'flex';
        });

        // Add to schedule - append to the day column
        dayColumn.appendChild(newClassItem);
        console.log(`Added class "${className}" to ${day}`);
    });

    // Make sure the schedule page is displayed
    document.getElementById('new-schedule-page').style.display = 'none';
    document.getElementById('schedule-page').style.display = 'block';
    document.getElementById('schedule-page').classList.add('active');

    // Clear form
    document.getElementById('className').value = '';
    document.getElementById('classCode').value = '';
    document.getElementById('classLocation').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    document.querySelectorAll('.day-option.selected').forEach(day => {
        day.classList.remove('selected');
    });

    // Reset color selection
    colorOptions.forEach(o => {
        o.style.boxShadow = 'none';
    });
    colorOptions[0].style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px #000'; // Select the first color option
    selectedColor = '#f9d5ca'; // Reset to default color

    // Save the updated schedule to localStorage
    saveClassesToLocalStorage();
});

// Helper function to format time (24h to 12h format)
function formatTime(time) {
    if (!time) return '';

    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12; // Convert 0 to 12

    return `${hour}:${minutes} ${ampm}`;
}

// Update the saveClassesToLocalStorage function
function saveClassesToLocalStorage() {
    const schedule = {};

    // For each day column, get the classes
    document.querySelectorAll('.column').forEach(column => {
        const day = column.querySelector('.day-label').textContent;
        const classes = [];

        // Get all class items in this column
        column.querySelectorAll('.class-item').forEach(item => {
            const timeDivs = item.querySelectorAll('.class-time');
            if (timeDivs.length < 2) {
                console.error('Class item missing time elements:', item);
                return;
            }

            const classObj = {
                name: item.querySelector('.class-name').textContent,
                startTime: timeDivs[0].textContent,
                endTime: timeDivs[1].textContent,
                color: item.style.backgroundColor || ''
            };

            // Add instructor and location if available
            if (item.dataset.instructor) {
                classObj.instructor = item.dataset.instructor;
            }

            if (item.dataset.location) {
                classObj.location = item.dataset.location;
            }

            classes.push(classObj);
        });

        schedule[day] = classes;
    });

    // Save to localStorage
    localStorage.setItem('classSchedule', JSON.stringify(schedule));
    console.log('Schedule saved to localStorage:', schedule);
}

// Add this function to properly attach click events to all class items
function attachClassItemEvents() {
    document.querySelectorAll('.class-item').forEach(item => {
        item.addEventListener('click', function () {
            const className = this.querySelector('.class-name').textContent;
            const timeDivs = this.querySelectorAll('.class-time');

            if (timeDivs.length < 2) {
                console.error('Time divs not found for class item:', this);
                return;
            }

            const classTime = timeDivs[0].textContent + ' - ' + timeDivs[1].textContent;

            // Show in modal instead of alert
            document.getElementById('modalClassName').textContent = className;
            document.getElementById('modalClassTime').textContent = classTime;

            // Handle optional fields
            if (this.dataset.instructor) {
                document.getElementById('modalInstructor').textContent = this.dataset.instructor;
                document.getElementById('modalInstructorRow').style.display = 'block';
            } else {
                document.getElementById('modalInstructorRow').style.display = 'none';
            }

            if (this.dataset.location) {
                document.getElementById('modalLocation').textContent = this.dataset.location;
                document.getElementById('modalLocationRow').style.display = 'block';
            } else {
                document.getElementById('modalLocationRow').style.display = 'none';
            }

            // Show the modal
            document.getElementById('classDetailsModal').style.display = 'flex';
        });
    });
}

// Run once when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Load saved classes
    loadClassesFromLocalStorage();

    // Attach events to all class items (including pre-existing ones)
    attachClassItemEvents();

    // Initialize color selection - select the first color by default
    if (colorOptions.length > 0) {
        colorOptions[0].style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px #000';
    }
});

// Update the loadClassesFromLocalStorage function
function loadClassesFromLocalStorage() {
    const savedSchedule = localStorage.getItem('classSchedule');
    if (savedSchedule) {
        try {
            const schedule = JSON.parse(savedSchedule);
            console.log('Loaded schedule from localStorage:', schedule);

            // For each day in the schedule
            Object.keys(schedule).forEach(day => {
                const dayAbbr = day.toLowerCase().substring(0, 3);
                const columnId = `${dayAbbr}-schedule`;
                const column = document.getElementById(columnId);

                if (!column) {
                    console.error(`Column not found for day: ${day}, ID: ${columnId}`);
                    return;
                }

                // Keep the day label, remove other content
                const dayLabel = column.querySelector('.day-label');
                if (!dayLabel) {
                    console.error(`Day label not found for column: ${columnId}`);
                    return;
                }

                column.innerHTML = '';
                column.appendChild(dayLabel);

                // Add saved classes
                schedule[day].forEach(classInfo => {
                    if (!classInfo.name || !classInfo.startTime || !classInfo.endTime) {
                        console.error('Invalid class info:', classInfo);
                        return;
                    }

                    const classItem = document.createElement('div');
                    classItem.className = 'class-item';

                    if (classInfo.color) {
                        classItem.style.backgroundColor = classInfo.color;
                    }

                    // Store additional data if available
                    if (classInfo.instructor) {
                        classItem.dataset.instructor = classInfo.instructor;
                    }

                    if (classInfo.location) {
                        classItem.dataset.location = classInfo.location;
                    }

                    // Create HTML structure matching the main schedule
                    classItem.innerHTML = `
                    <div class="class-time">${classInfo.startTime}</div>
                    <div class="class-name">${classInfo.name}</div>
                    <div class="class-time">${classInfo.endTime}</div>
                `;

                    // Add to column
                    column.appendChild(classItem);
                });
            });

            // Attach events to all loaded class items
            attachClassItemEvents();

        } catch (error) {
            console.error('Error loading schedule from localStorage:', error);
        }
    }
}

// Close class details modal when close button is clicked
document.getElementById('closeClassModal').addEventListener('click', function () {
    document.getElementById('classDetailsModal').style.display = 'none';
});

// Also close class details modal when clicking outside of it
document.getElementById('classDetailsModal').addEventListener('click', function (event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Add sample instructor and location data to existing classes
    const classItems = document.querySelectorAll('.class-item');
    classItems.forEach(item => {
        const className = item.querySelector('.class-name').textContent;

        // Add instructor data based on class name if not already set
        if (!item.dataset.instructor) {
            switch (className) {
                case 'WEB SYSTEMS':
                    item.dataset.instructor = 'Prof. Rodriguez';
                    item.dataset.location = 'Room 301A';
                    break;
                case 'IT 115':
                    item.dataset.instructor = 'Dr. Chen';
                    item.dataset.location = 'Tech Lab 2';
                    break;
                case 'HCI':
                    item.dataset.instructor = 'Prof. Johnson';
                    item.dataset.location = 'Room 202B';
                    break;
                case 'IT 112':
                    item.dataset.instructor = 'Dr. Williams';
                    item.dataset.location = 'Computer Lab 3';
                    break;
                case 'IT 116':
                    item.dataset.instructor = 'Prof. Garcia';
                    item.dataset.location = 'Tech Hub';
                    break;
                case 'COM. PROG.2':
                    item.dataset.instructor = 'Dr. Taylor';
                    item.dataset.location = 'Room 405';
                    break;
                case 'ELECTIVE 1':
                    item.dataset.instructor = 'Dr. Anderson';
                    item.dataset.location = 'Seminar Hall';
                    break;
                case 'STUDY GROUP':
                    item.dataset.instructor = 'Peer-led';
                    item.dataset.location = 'Library Study Room 3';
                    break;
                default:
                // No data added
            }
        }
    });

    // Make sure all class items have proper click events
    // This uses the existing attachClassItemEvents function without modifying it
    if (typeof attachClassItemEvents === 'function') {
        attachClassItemEvents();
    }
});
// ------------------------------JS for Create Task Pop Up-----------------------------------//
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("createTaskModal");
    const closeBtn = document.querySelector(".task-close-button");
    const todoBtn = document.getElementById("addTodoButton");
    const confirmButton = document.getElementById("confirmButton");
    const tasksContainer = document.getElementById("tasksContainer");
    const labelSelect = document.getElementById("labelSelect");
    const allButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === "All"
);
const ongoingButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === "Ongoing"
);
const missedButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === "Missed"
);
const completedButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === "Completed"
);
    
    let tasks = []; // Array to store tasks

    // Open the modal when the "+Todo" button is clicked
    if (todoBtn) {
        todoBtn.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    }

    // Close the modal when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Close the modal when clicking outside of it
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Add a new label option
    labelSelect.addEventListener("change", function () {
        if (labelSelect.value === "Add a New Label") {
            const newLabel = prompt("Enter a new label:");
            if (newLabel) {
                const option = document.createElement("option");
                option.textContent = newLabel;
                option.value = newLabel;
                labelSelect.insertBefore(option, labelSelect.lastElementChild);
                labelSelect.value = newLabel;
            }
        }
    });

    // Handle task creation
    confirmButton.addEventListener("click", function () {
        const taskNameInput = modal.querySelector("input[type='text']");
        const taskName = taskNameInput.value.trim();
        const deadlineInput = document.getElementById("deadlineToggle");
        const deadline = deadlineInput.value;
        const label = labelSelect.value;

        if (taskName) {
            // Create a new task object
            const task = {
                name: taskName,
                deadline: deadline,
                label: label,
                completed: false,
            };

            tasks.push(task); // Add task to the array
            renderTasks(); // Update the task list

            // Clear the input fields
            taskNameInput.value = "";
            deadlineInput.value = "";

            // Close the modal
            modal.style.display = "none";
        } else {
            alert("Please enter a task name.");
        }
    });

    // Render tasks based on the filter
    function renderTasks(filter = "all") {
        tasksContainer.innerHTML = ""; // Clear the task list

        const filteredTasks = tasks.filter((task) => {
            if (filter === "all") return true;
            if (filter === "ongoing") return !task.completed && new Date(task.deadline) >= new Date();
            if (filter === "missed") return !task.completed && new Date(task.deadline) < new Date();
            if (filter === "completed") return task.completed;
        });

        if (filteredTasks.length === 0) {
            tasksContainer.innerHTML = `<p style="text-align:center; color: gray;">No tasks found.</p>`;
            return;
        }

        filteredTasks.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task-item");

            taskElement.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
                <span class="task-name">${task.name}</span>
                <span class="task-label">${task.label}</span>
                <span class="task-deadline">${task.deadline ? `Due: ${task.deadline}` : ""}</span>
            `;

            // Add event listener to the checkbox
            const checkbox = taskElement.querySelector("input[type='checkbox']");
            checkbox.addEventListener("change", function () {
                const taskIndex = this.getAttribute("data-index");
                tasks[taskIndex].completed = this.checked;
                renderTasks(filter); // Re-render tasks
            });

            tasksContainer.appendChild(taskElement);
        });
    }

    // Filter buttons functionality
    allButton.addEventListener("click", () => renderTasks("all"));
    ongoingButton.addEventListener("click", () => renderTasks("ongoing"));
    missedButton.addEventListener("click", () => renderTasks("missed"));
    completedButton.addEventListener("click", () => renderTasks("completed"));
});  

// ------------------------------JS for Search, Add, Delete, SelectAll, Modal-----------------------------------//
    let selectedColor = '#f4a261';
    function openModal() {
        document.getElementById('folderModal').style.display = 'flex';
    }
    function closeModal() {
        document.getElementById('folderModal').style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == document.getElementById('folderModal')) {
        closeModal();
        }
    }
    document.querySelectorAll('.color-circle').forEach(circle => {
        circle.addEventListener('click', function () {
        document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedColor = this.getAttribute('data-color');
        });
    });
    function updateSelectionUI() {
        const checkboxes = document.querySelectorAll('.folder-checkbox');
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const selectAllCheckbox = document.getElementById('selectAll');
        const deleteBtn = document.querySelector('button[onclick="deleteSelected()"]');
        // Automatically check/uncheck 'Select All' if all/none are selected
        if (checkedCount === checkboxes.length && checkboxes.length > 0) {
            selectAllCheckbox.checked = true;
        } else {
            selectAllCheckbox.checked = false;
        }
        // Show or hide delete button based on any selection
        if (checkedCount > 0) {
            deleteBtn.style.display = 'inline-block';
        } else {
            deleteBtn.style.display = 'none';
        }
    }
    // To create or add folder
    function createFolder() {
        const name = document.getElementById('folderNameInput').value || 'Untitled';
        const folderList = document.getElementById('folderList');
        const folder = document.createElement('div');
        folder.className = 'folder';
        folder.innerHTML = `
        <input type="checkbox" class="folder-checkbox" style="position: absolute; top: 10px; left: 10px;"
        onchange="updateSelectionUI()">
        <img src="/IMAGES/custom-folder.png" style="margin-top: 10px; width: 100px; height: 100px; filter: brightness(0)
        saturate(100%) sepia(1) hue-rotate(0deg) drop-shadow(0 0 3px ${selectedColor});">
        <div class="folder-title">${name}</div>
        `;
        // To make folder clickable and to check checkbox
        folder.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = folder.querySelector('.folder-checkbox');
                checkbox.checked = !checkbox.checked;
                updateSelectionUI();
            }
        });
        folderList.appendChild(folder);
        document.getElementById('folderNameInput').value = '';
        closeModal();
        updateSelectionUI();
    }
    //To filter or search for specific folder
    function searchFolders() {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const folders = document.querySelectorAll('#folderList .folder');
        let anyVisible = false;
        folders.forEach(folder => {
            const title = folder.querySelector('.folder-title').textContent.toLowerCase();
            const visible = title.includes(input);
            folder.style.display = visible ? 'block' : 'none';
            if (visible) anyVisible = true;
        });
        updateFolderUIVisibility();
    }
    // To use select all button to delete all folders
    function toggleSelectAll(checkbox) {
        const checkboxes = document.querySelectorAll('.folder-checkbox');
        checkboxes.forEach(cb => {
        if (cb.closest('.folder').style.display !== 'none') {
            cb.checked = checkbox.checked;
        }
        });
        updateSelectionUI();
    }
    // To use the delete button
    function deleteSelected() {
        const checkboxes = document.querySelectorAll('.folder-checkbox:checked');
        checkboxes.forEach(cb => {
        const folder = cb.closest('.folder');
        if (folder) folder.remove();
        });
        updateFolderUIVisibility();
    }
    function updateSelectionUI() {
        const checkboxes = document.querySelectorAll('.folder-checkbox');
        const visibleCheckboxes = Array.from(checkboxes).filter(cb => cb.closest('.folder').style.display !== 'none');
        const selected = visibleCheckboxes.filter(cb => cb.checked);
        // To show delete button if at least one folder is selected
        document.getElementById('deleteBtn').style.display = selected.length > 0 ? 'inline-block' : 'none';
        // To update "Select All" checkbox state
        const selectAll = document.getElementById('selectAll');
        if (visibleCheckboxes.length === 0) {
            document.getElementById('selectAllLabel').style.display = 'none';
        } else {
            document.getElementById('selectAllLabel').style.display = 'flex';
        }
        selectAll.checked = selected.length === visibleCheckboxes.length && visibleCheckboxes.length > 0;
    }
    function updateFolderUIVisibility() {
        const folders = document.querySelectorAll('.folder');
        const hasVisibleFolders = Array.from(folders).some(f => f.style.display !== 'none');
        const checkboxes = document.querySelectorAll('.folder-checkbox:checked');
        document.getElementById('selectAllLabel').style.display = hasVisibleFolders ? 'flex' : 'none';
        document.getElementById('deleteBtn').style.display = checkboxes.length > 0 ? 'inline-block' : 'none';
        document.getElementById('selectAll').checked = false;
    }

// ---------------------------------------- JS for Lock-In Page -------------------------------------------- //
    let currentTimerType = null;
    function togglePopupFooter(type) {
        currentTimerType = type;
        document.getElementById('timerFooter').style.display = 'none';
        document.getElementById('accessedAppPopup').style.display = 'none';
        if (type === 'start' || type === 'end') {
            document.getElementById('footerLabel').textContent = type === 'start' ? 'Set Start Time' : 'Set End Time';
            document.getElementById('footerTimeInput').value = '';
            document.getElementById('timerFooter').style.display = 'block';
        } else if (type === 'app') {
            document.getElementById('accessedAppPopup').style.display = 'block';
        }
    }
    function submitFooterTime() {
        const timeValue = document.getElementById('footerTimeInput').value;
        if (timeValue && currentTimerType) {
        const outputId = currentTimerType === 'start' ? 'startOutput' : 'endOutput';
        document.getElementById(outputId).textContent = `${currentTimerType === 'start' ? 'Start' : 'End'}
        Time: ${timeValue}`;
        hideFooter();
        }
    }
    function hideFooter() {
    document.getElementById('timerFooter').style.display = 'none';
    document.getElementById('accessedAppPopup').style.display = 'none';
    }

// -----------------------------------JS for Settings Page----------------------------------- //
document.addEventListener('DOMContentLoaded', function () {
    const settingOptions = document.querySelectorAll('.Settings-fieldset');
    const sections = document.querySelectorAll('.settings-section');
    const settingsMenu = document.getElementById('settings-options');
  
    // Handle clicking any setting option
    settingOptions.forEach(option => {
      option.addEventListener('click', () => {
        const targetId = option.getAttribute('data-target');
  
        // Hide menu and all sections
        settingsMenu.classList.add('hidden');
        sections.forEach(sec => sec.classList.remove('active'));
  
        // Show target section
        const target = document.getElementById(targetId);
        if (target) target.classList.add('active');
      });
    });
  
    // Handle back button in each section
    const backButtons = document.querySelectorAll('.back-to-settings');
    backButtons.forEach(button => {
      button.addEventListener('click', () => {
        settingsMenu.classList.remove('hidden');
        sections.forEach(sec => sec.classList.remove('active'));
      });
    });
  });
// Change Password JS //
function enableButton() {
    document.getElementById("continueBtn").disabled = false;
};
// ----------------------JS for Feedback Pop Up--------------------------//
// Feedback modal logic
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('feedbackModal');
    const closeBtn = document.getElementById('feedbackClose');
    const sendBtn = document.getElementById('feedbackSend');
    const cancelBtn = document.getElementById('feedbackCancel');
    
  
    // Example triggers (add your own buttons)
    document.querySelectorAll('.report-btn, .feature-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'flex';
      });
    });
  
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    cancelBtn.addEventListener('click', () => modal.style.display = 'none');
    sendBtn.addEventListener('click', () => modal.style.display = 'none');
    // Close modal when clicking outside of it
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
  });
  