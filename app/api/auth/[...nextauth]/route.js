import { connectDB } from '@utils/database';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
// console.log(process.env.GOOGLE_ID, process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			checks: ['none'],
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session.user.email });
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }) {
			try {
				await connectDB();
				// check if user exists
				const UserExists = await User.findOne({ email: profile.email });
				// if not create a one
				if (!UserExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(' ', '').toLowerCase(),
						image: profile.picture,
					});
				}
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
