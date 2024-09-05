import NextAuth, { AuthOptions, Awaitable } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

const clientId = process.env.DISCORD_CLIENT_ID as string;
const clientSecret = process.env.DISCORD_CLIENT_SECRET as string;

const scopes = ['identify', 'email', 'guilds', 'guilds.members.read']

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  callbacks: {
    jwt: ({token, account, profile})=> {
      if(account){
        //@ts-ignore
        token.isValidUser = profile?.isValidUser;
      }
      return token;
    },
    session: ({session, token}) => {

      return {
        ...session,
        isValidUser: token.isValidUser,
      };
    }
  },
  providers: [
    DiscordProvider({
      clientId,
      clientSecret,
      authorization:
      `https://discord.com/api/oauth2/authorize?client_id=1204138978396348507&response_type=code&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL as string)}%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=identify+email+guilds+guilds.members.read`,
      
    userinfo: {
      url: "https://discord.com/api/users/@me",
      async request({
        tokens
      }) {
        const url = new URL(`https://discord.com/api/v10/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`);
        const req = await fetch(url, {
          headers: {
            "Authorization": "Bearer " + tokens.access_token as string
          }
        });
        const valindMember = await req.json();
        const url2 = new URL(`https://discord.com/api/v10/users/@me`);
        const req2 = await fetch(url2, {
          headers: {
            "Authorization": "Bearer " + tokens.access_token as string
          }
        });
        const data = await req2.json();
        return {
          ...data,
          isValidUser: !!valindMember.joined_at,  
        };
      }

    },
    profile(profile) {
      if (profile.avatar === null) {
        const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
        profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
      } else {
        const format = profile.avatar.startsWith("a_") ? "gif" : "png";
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
      }

      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.image_url
      };
    },
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions);
