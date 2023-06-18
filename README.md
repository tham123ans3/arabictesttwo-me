Developer Note:

Mac OS:

1. create a fresh directory or new directory in your local windows/macos folder
   launch the new command window (windows) or terminal window (mac os)
   cd to the new folder created

2. clone the source code from git repo
    git clone <repo url>
    for example, "git clone https://github.com/tham123ans3/arabictesttwo-me"

3. then set the git user name and password using 'git config' commmand such as
     git config user.name <git username>
     git config user.email <git emailid>

     for example,
     git config user.name "tham123ans3"
     git config user.email "tham123ans3@gmail.com"
     
4. go to the project home folder and issue the following command to install all the neessary node dependencies
    yarn
    Note: if yarn is not working, then install yarn using npm and run it, then run 'yarn' to install the necessary/dependent packages


5. Create a .bashrc file with the following content and execute '. .bashrc'

      export ANDROID_HOME=$HOME/Library/Android/sdk
      export PATH=$PATH:$ANDROID_HOME/emulator
      export PATH=$PATH:$ANDROID_HOME/platform-tools
      export PATH=$PATH:/Users/user237789/reactnative/arabictesttwo-me/node_modules/yarn/bin
      export PS1='\u@\H:\w$'

    Note:
         yarn path is hard-coded to a project directory as we were using
6. cd ios
7. issue 'pod install' . this will install the necessary dependences 
8. once installed, then do 'yarn ios' to run


starting the program:
WEB:
    yarn web

IOS:
  yarn ios


ANDROID:
   yarn android

   if this command is giving problem sayting some thing like "permission denied" or "gradlew EACCESS", then android directory is not having write permission. the solution is
       cd android
       execute "find . -exec chmod 755 {} \;"
       
   
windows:
    yet to do