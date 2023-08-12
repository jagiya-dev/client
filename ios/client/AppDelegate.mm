#import "AppDelegate.h"

// https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-get-started
#import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"client";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  // rn cli original
  // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  // argument bundleURL is the app's bundle is named `main.jsbundle`.
  return [CodePush bundleURL];
#endif
}

@end
