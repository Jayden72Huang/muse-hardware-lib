// Original ASCII-art robot holding a wrench — drawn for the homepage hero,
// in the spirit of dense shaded ASCII mascots (source: hero-ascii-robot-wrench.txt).
// Purely decorative — the <pre> is aria-hidden; the wrapper carries
// role="img" with a short accessible label. No copy, so no i18n needed.
const ART = String.raw`                                  :*@@@%
                     =##-        :@@%=-.
                     #@@*        +@@-
                      **         .%@@*+:
             :+#######@@#######+:  =#@@%
            *@@%*===++==++===*@@@+  .@@#
           :@@+  .::      .:.  *@@. .@@#
           :@@: =%+@*    #+%@: =@@. .@@#
           :@@:  =*=.    .+*-  =@@. .@@*
           :@@+                *@@. .@@#      .:.
            #@@%+++#@#+*#@*++*@@@*   ==-     +@@@+
             :+#####@@@@@%####*=.         :*@@@@@+
            ::::::::#@@@@*::::::::     .=#@@@%+:.
      .:  =@@@@@@@@@@@@@@@@@@@@@@@%- :*@@@@#-
     =@@@=@@@=.     .    .     .=@@@%@@@%+.
     *@@@*@@+         .          #@@@@#-
     +@@@+@@+       =%##%=       #@@:.
     +@@@+@@+      +@:  -@-      #@@.
     +@@@+@@+      :@*--#%.      #@@.
     =@@@+@@+       .=**=        *@@.
     #@@@#@@*                    %@@.
     =%%#-@@@%+===++++++++++===+@@@%
          .+#%@@@@@%%%%%%%%@@@@@%#=
             *@@@@%.      :@@@@@+
             %@@@@@-      =@@@@@#
             %@@@@@:      =@@@@@#
             %@@@@@:      =@@@@@#
             %@@@@@-      =@@@@@#
           -@@@@@@@@#    %@@@@@@@%:
           -@@@@@@@@#    %@@@@@@@@:
             .......      .......`;

export default function AsciiMascot() {
  return (
    <div
      role="img"
      aria-label="ASCII robot holding a wrench"
      className="mascot-wiggle hidden shrink-0 select-none md:block"
    >
      <pre
        aria-hidden="true"
        className="font-mono text-[8px] leading-[1.08] text-foreground"
      >
        {ART}
      </pre>
    </div>
  );
}
