<?php while (have_posts()) : the_post(); ?>
	
	<section id="home" class="homeSlide">
		<div id="home-bg" class="parallax bcg" 
			>
			<div class="background-overlay" ></div>
			<div class="container" >
				<div class="wrapper">
					<div class="inner">
						<div class="hero-unit" 
						data-center="opacity: 1;"
						data-100-top="opacity: 1;"
                		data-0-top="opacity: 0.2;"
                		data-anchor-target="#home h1">
							<h5 class="downBig">Hello, I am</h5>
							<h1 class="downBig">Emmanuel Garcia</h1>
							<h5 class="hidden-xs upBig">Front-End Engineer, Responsive Developer &amp; Wordpress Afficionado</h5>
							<h5 class="visible-xs upBig">HTML5, Front-End &amp; Responsive Developer</h5>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</section>

	<section id="portfolio" class="homeSlide" data-content-offset="-80">
		<div class="container">
			<div class="wrapper">
				<div class="content">
					<div class="header">
						<h2><span>Selected Works</span></h2>
					</div>

		
					<!-- Portfolio Filter -->
					<ul id="portfolio-filter" class="filter-group list-inline ">
						<li class="button-filter active" data-filter="*"><span class="type">All</span></li>
					  	<li class="button-filter" data-filter=".php"><span class="type">PHP</span></li>
					  	<li class="button-filter" data-filter=".jquery"><span class="type">Javascript</span></li>
					  	<li class="button-filter" data-filter=".wordpress"><span class="type">Wordpress</span></li>
					  	<li class="button-filter" data-filter=".responsive"><span class="type">Responsive</span></li>
					</ul>

		
					<!-- Project List -->
					<div id="portfolio-list" class="isotope js-isotope" >
						<div class="grid-sizer"></div>
						<div class="gutter-sizer"></div>
						
						<?php $loop = new WP_Query( array( 'post_type' => 'portfolio', 'posts_per_page' => -1 ) ); ?>
						<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
							<div class="
							<?php 
								$terms_as_text = get_the_term_list( $post->ID, 'attribute', '', ' ', '' ) ;
								echo strip_tags($terms_as_text);
							?>
							isotope-item" >
							  	<a target="_blank" href="http://<?php the_field('project_url');?>">
							  		<div class="project-thumbnail">
										<?php the_post_thumbnail('full');?>
									</div>
									<div class="portfolio-item-content meta-data-hover">
										<div class="wrapper">
											<div class="inner">
												<div class="header"><?php the_field('project_title');?></div>
												<div class="separator"></div>
												<p class="body">Branding, Gallery</p>
												<button class="btn" href="#">View Project</button>
											</div>
										</div>
									</div>
								</a>
							</div>							
						<?php endwhile; wp_reset_query(); ?>

				  	</div>
		
				</div>
			</div>
		</div>
	</section>

	<section id="contact" class="homeSlide" data-content-offset="-60">
		<div class="container">
			<div class="wrapper">
				<div class="content">
					<div class="header">
						<h2><span>Get in touch</span></h2>
					</div>
						
					<div class="row">

						<div class="col-sm-6">
									
							<?php gravity_form(1, false, false, false, null, true); ?>
						</div>

						<div class="col-sm-4 col-sm-offset-1">
							<div class="additional">
								<h4>Emmanuel Garcia</h4>
								<p>Feel free to contact me at <a href="mailto:eman7g@gmail.com">eman7g@gmail.com</a> or use the contact form.</p>
							</div>
							<div class="additional">
								<h4>Connect with me</h4>
								<p><a target="_blank" href="https://www.github.com/eman7g" target="_blank">Github</a><br>
								<a target="_blank" href="https://linkedin.com/emmanuel_garcia" target="_blank">LinkedIn</a><br>
								<a target="_blank" href="https://www.facebook.com/eman7g" target="_blank">Facebook</a><br>
								<a target="_blank" href="http://instagram.com/eman_garcia" target="_blank">Instagram</a></p>
							</div>
							
							<div class="phone">
								<big>503 708 8570</big>
								<span>AVAILABLE AT 9AM - 6PM</span>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="social">
		<div itemscope="" itemtype="http://schema.org/Person">
			<span class="name-schema" itemprop="name">Emmanuel Garcia</span>
			<div class="container">
				<ul  class="row">
					<li class="column col-xs-2">
						<a rel="Github" itemprop="url" name="github_profile" class="github ss-icon ss-social-circle" target="_blank" title="emmanuel garcia github profile" href="https://github.com/eman7g">Github</a>
					</li>

					<li class="column col-xs-2">
						<a rel="LinkedIn" itemprop="url" name="linkedin_profile" class="linkedin ss-icon ss-social-circle" target="_blank" title="emmanuel garcia linkedin profile" href="http://lnkd.in/XfW5Sv">Linkedin</a>
					</li>

					<li class="column col-xs-2">
						<a rel="Facebook" itemprop="url" name="facebook_profile" class="facebook ss-icon ss-social-circle" target="_blank" title="emmanuel garcia facebook profile" href="https://www.facebook.com/eman.7g">Facebook</a>
					</li>
					
					<li class="column col-xs-2">
						<a rel="Instagram" itemprop="url" name="instagram_profile" class="instagram ss-icon ss-social-circle" target="_blank" title="emmanuel garcia instagram profile" href="http://instagram.com/eman_garcia">Instagram</a>
					</li>
					
					<li class="column col-xs-2">
						<a rel="Twitter" itemprop="url" name="twitter_profile" class="pinterest ss-icon ss-social-circle" target="_blank" title="emmanuel garcia pinterest profile" href="http://www.pinterest.com/eman7g/">Pinterest</a>
					</li>
					<li class="column col-xs-2">
						<a rel="MailTo" itemprop="url" name="email_profile" class="mail ss-icon ss-social-circle" target="_blank" title="emmanuel garcia email" href="mailto:eman.7g@gmail.com">Mail</a>
					</li>
				</ul>
			</div>
		</div>
	</section>
	   
<?php endwhile; ?>