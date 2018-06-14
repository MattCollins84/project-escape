const term = require( 'terminal-kit' ).terminal ;

// handle ctrl+c
term.grabInput() ;

term.on('key', (name, matches, data) => {
	if (name === 'CTRL_C') { process.exit(); }
});

// references
const ref = new Map();
ref.set('password', 'password');
ref.set('tokens', ["mirror", "lamp", "coat", "radio", "file"]);
ref.set('mirror', { code: '123', number: 1, complete: false })
ref.set('lamp', { code: '123', number: 2, complete: false })
ref.set('coat', { code: '123', number: 3, complete: false })
ref.set('radio', { code: '123', number: 4, complete: false })
ref.set('file', { code: '123', number: 5, complete: false })

const createProgressBar = (callback) => {
  var progress = 0;

  function increment() {
    progress += Math.random() / 10;
    progressBar.update(progress);
    if (progress >= 1) {
      return setTimeout(callback, 500)
    }
    return setTimeout(increment, 150);
  }

  const progressBar = term.progressBar( {
    width: 80,
    title: "\nConfiguring client...",
    eta: true,
    percent: true
  });

  increment();

}

// enter password function
const enterPassword = (callback) => {
  term.red("Enter password: ") ;
  term.inputField(
    function( error , input ) {
      if (input === 'help') {
        term.green("\n\nPassword hint: ");
        term.yellow("Einsteins 6th Word\n\n");
        return callback(false);
      }

      if (ref.get('password') !== input) {
        term.red("\nIncorrect password, please try again.\n\n");
        return callback(false);
      }
      
      return callback(true);

    }
  );
}

const doLogin = (callback) => {
  enterPassword(correct => {
    if (!correct) return doLogin(callback);
    return createProgressBar(callback)
  });
}

// handle tokens
const handleTokens = (err, callback) => {

  let allTokens = true;
  ref.get('tokens').forEach(token => {
    allTokens = ref.get(token).complete;
  });

  if (allTokens) {

    term.green("\n\nAll access tokens entered successfully. Use tokens in the following order:\n\n")
    term.red.bold(
      "    [  coat  -  file  -  mirror  -  lamp  -  radio  ]    \n"
    );
    return;

  }

  term.clear();

  if (err) {
    term.red.bold("Incorrect entry, please try again.\n\n");
  }
  term.green("To generate a code you must provide all code tokens. Required tokens are:\n\n");
  
  ref.get('tokens').forEach(token => {
    
    const t = ref.get(token);
    if (t.complete) return term.green(" * " + token + " [entered: " + t.number + "]\n");
    term.red(" * " + token + "\n");

  });
  
  term("\n");
  
  term.green("Enter the token you which to decode: ") ;

  term.inputField(
    (error, input) => {
      if (!ref.get('tokens').includes(input) || error) return handleTokens(true, callback); 
      const selectedToken = input;
      term.green("\nEnter the code for the token (" + selectedToken + "): ") ;
      term.inputField(
        (error, input) => {
          if (error || ref.get(selectedToken).code !== input) return handleTokens(true, callback);
          ref.get(selectedToken).complete = true;
          return handleTokens(false, callback);
        }
      )

    }
  );
  
}

/**
 * Begin
 */

term.red.bold(`Site Internal Security Terminal Machine (SISTM)
`)

term.slowTyping(`Welcome to AKME Labs inc.
Type help for assistance.
This is a Secure System for authorised personel only.
If you are unsure whether you are authorised, you are probably not. Please call the Akme Help Desk (AHD) on Ext. 492.

`, 
{ flashStyle: term.brightWhite, delay: 10 },
() => {
  doLogin(() => {
    
    handleTokens(false, () => {
      


    })

  });
});