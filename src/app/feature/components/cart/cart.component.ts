import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CartItemInteface } from 'src/app/shared/interfaces/cart-state.interface ';
import { addToCartSelector } from 'src/app/core/store/selectors/cart.selectors ';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import {
  addOrderAction,
  decreaseQuantityinCartAction,
  deleteFromCartAction,
  increaseQuantityinCartAction,
} from 'src/app/core/store/actions/cart.action';
import { CartStorageSyncService } from 'src/app/core/services/cart-storage-sync.service ';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  userEmailSelector,
  userPhoneSelector,
  userIdSelector,
  userNameSelector,
  isLogginSelector,
} from 'src/app/core/store/selectors/auth.selectors ';
import { OrderInterface } from 'src/app/shared/interfaces/order.interface ';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnDestroy {
  public cartItems: CartItemInteface[] = [];
  public totalCost = 0;
  public cart$!: Observable<CartItemInteface[]>;
  public userName$!: Observable<string>;
  public userId$!: Observable<number | null>;
  public userEmail$!: Observable<string>;
  public userPhone$!: Observable<number | null>;

  public destroy$: Subject<boolean> = new Subject<boolean>();
  public isOrder = false;
  public noAuth = false;
  public form!: FormGroup;
  public delivery = ['сourier', 'self-pickup'];
  public payment = ['card', 'cash'];
  public authUserNameData!: string;
  public authUserIdData!: number | null;
  public authUserPhoneData!: number | null;
  public authUserEmailData!: string;
  public isLogin = false;
  public isForLogin = false;

  constructor(
    private storageSyncServ: CartStorageSyncService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.addToCart();
    this.cart$.pipe(takeUntil(this.destroy$)).subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.totalCost = cartItems
        .map((product) => product.dish.price * product.quantity)
        .reduce((acc, value): number => acc + value, 0);
    });
    this.storageSyncServ.init();

    this.store.pipe(select(isLogginSelector)).subscribe((data) => {
      if (!data) return;
      this.isLogin = data;
      console.log(this.isLogin);
    });
    console.log(this.noAuth);
  }

  public addToCart(): void {
    this.cart$ = this.store.pipe(select(addToCartSelector));
  }

  public deleteCartItem(id: number): void {
    this.store.dispatch(deleteFromCartAction({ id }));
  }

  public increaseQuantityInCart(id: number): void {
    this.store.dispatch(increaseQuantityinCartAction({ id }));
  }

  public decreaseQuantityInCart(id: number): void {
    this.store.dispatch(decreaseQuantityinCartAction({ id }));
  }

  public createOrder(): void {
    this.isOrder = true;
    console.log(this.isOrder);
  }

  public createOrderForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.isLogin ? this.authUserNameData : null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(this.isLogin ? this.authUserEmailData : null, [
        Validators.required,
        Validators.email,
      ]),

      phone: new FormControl(this.isLogin ? this.authUserPhoneData : null, [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
      ]),
      address: new FormControl(null, [Validators.required]),
      delivery: new FormControl(null, Validators.required),
      payment: new FormControl(null, Validators.required),
    });
  }
  public createOrderNoAuth(): void {
    this.noAuth = true;
    this.isOrder = false;
    this.createOrderForm();
  }

  public createOrderAuth(): void {
    this.isForLogin = true;
    this.userName$ = this.store.pipe(select(userNameSelector));
    this.userName$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.authUserNameData = val;
    });

    this.userId$ = this.store.pipe(select(userIdSelector));
    this.userId$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.authUserIdData = val;
    });

    this.userPhone$ = this.store.pipe(select(userPhoneSelector));
    this.userPhone$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.authUserPhoneData = val;
    });

    this.userEmail$ = this.store.pipe(select(userEmailSelector));
    this.userEmail$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.authUserEmailData = val;
    });

    console.log('this.isLogin', this.isLogin);
    console.log('this.authUserNameData', this.authUserNameData);
    console.log('authUserIdData', this.authUserIdData);
    console.log('this.authUserPhoneData', this.authUserPhoneData);
    console.log('this.authUserEmailData', this.authUserEmailData);
    console.log('this.noAuth', this.noAuth);

    this.createOrderForm();
  }

  public onSubmit(formDirective: any): void {
    // console.log(this.form.value);
    // console.log(this.cartItems);
    // const message = 'Your order has been successfully formed';

    if (this.form.invalid) {
      return;
    }

    const order: OrderInterface = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      address: this.form.value.address,
      delivery: this.form.value.delivery,
      payment: this.form.value.payment,
      dishes: this.cartItems,
      userID: this.isLogin
        ? this.authUserIdData
        : Math.floor(100000000000 + Math.random() * 900000),
    };

    console.log('authOrder', order);

    this.store.dispatch(addOrderAction({ order }));

    // this.store.pipe(select(isRegistredSelector)).subscribe((data) => {
    //   if (!data) return;

    //   this.isRegistred = data;
    //   console.log(this.isRegistred);
    //   if (this.isRegistred === true) this.openSnackBar(message);
    // });

    // this.store
    //   .pipe(select(isRegistredErrorSelector), takeUntil(this.destroy$))
    //   .subscribe((data) => {
    //     if (!data) return;
    //     this.errorMessage = data;
    //     this.openSnackBar(this.errorMessage);
    //   });

    this.form.reset();
    formDirective.resetForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
