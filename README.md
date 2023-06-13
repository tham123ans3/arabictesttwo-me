Developer Note:

IOS:
1. Create a .bashrc file with the following content and execute '. .bashrc'

      export ANDROID_HOME=$HOME/Library/Android/sdk
      export PATH=$PATH:$ANDROID_HOME/emulator
      export PATH=$PATH:$ANDROID_HOME/platform-tools
      export PATH=$PATH:/Users/user237789/reactnative/arabictesttwo-me/node_modules/yarn/bin
      export PS1='\u@\H:\w$'

2. if yarn is not working, then install yarn using npm and run it, then run 'yarn' to install the necessary/dependent packages
3. cd ios
4. issue 'pod install' . this will install the necessary dependences 
3. once installed, then do 'yarn ios' to run


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
       
   
