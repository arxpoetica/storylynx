<ul class="share">
	<li><a href="https://www.facebook.com" target="_blank" rel="nofollow"><FacebookIcon/></a></li>
	<li><a href="https://aboutme.google.com" target="_blank" rel="nofollow"><GoogleIcon/></a></li>
	<li><a href="https://www.instagram.com/" target="_blank" rel="nofollow"><InstagramIcon/></a></li>
	<li><a href="https://www.linkedin.com" target="_blank" rel="nofollow"><LinkedinIcon/></a></li>
	<li><a href="https://twitter.com" target="_blank" rel="nofollow"><TwitterIcon/></a></li>
	<li><a href="https://www.youtube.com/" target="_blank" rel="nofollow"><YoutubeIcon/></a></li>
	<li><a href="mailto:?to=&amp;subject=headline&amp;body=body" rel="nofollow"><EmailIcon/></a></li>
</ul>

<script>
	import FacebookIcon from '../svg/social-facebook.svelte'
	import GoogleIcon from '../svg/social-google.svelte'
	import InstagramIcon from '../svg/social-instagram.svelte'
	import LinkedinIcon from '../svg/social-linkedin.svelte'
	import TwitterIcon from '../svg/social-twitter.svelte'
	import YoutubeIcon from '../svg/social-youtube.svelte'
	import EmailIcon from '../svg/social-email.svelte'
</script>

<style type="text/scss">
	.share {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			width: 20rem;
			margin: 0 10rem 10rem;
		}
		a {
			display: block;
			width: 100%;
			height: 100%;
			color: $black;
			transition: color 0.2s ease-in-out;
			&:hover {
				color: $links;
			}
		}
	}
</style>
